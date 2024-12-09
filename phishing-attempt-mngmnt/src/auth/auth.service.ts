import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./models/create-user.model";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("users") private user: Model<User>,
        private jwtService: JwtService,
        private configservice: ConfigService) { }

    async register(request: CreateUserDto) {
        let user = await this.user.findOne<User>({ username: request.username }).exec()
        if (user)
            throw new BadRequestException("Username exists!");

        let passwordSalt = await bcrypt.genSalt()
        let passwordHash = await bcrypt.hash(request.password, passwordSalt)

        let newUser: User = {
            username: request.username,
            passwordHash: passwordHash,
            passwordSalt: passwordSalt
        }

        await this.user.create(newUser)
    }

    async login(request: CreateUserDto) {
        let user = await this.user.findOne<User>({ username: request.username }).exec()
        if (!user)
            throw new UnauthorizedException("User not found");

        let hasAccess = await bcrypt.compare(request.password, user.passwordHash)
        if (!hasAccess)
            throw new UnauthorizedException("User not found");

        let token = await this.jwtService.signAsync({ username: user.username }, { secret: this.configservice.get('JWT_SECRET_KEY') })
        return { token: token }
    }
}
