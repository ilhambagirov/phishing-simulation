using MongoDB.Driver;
using PhishingSimulation.Models;
using PhishingSimulation.Services;
using PhishingSimulation.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
Accessor.AppConfiguration = builder.Configuration;
IConfiguration configuration = builder.Configuration;

builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

builder.Services.AddSingleton<IMongoClient>(sp =>
{ 
    var connectionString = configuration["Mongo:ConnectionString"];
    return new MongoClient(connectionString);
});
builder.Services.AddScoped(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var database = configuration["Mongo:DB_NAME"];
    return client.GetDatabase(database);
});
builder.Services.AddScoped(typeof(IPhishingAttemptService), typeof(PhishingAttemptService));
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();

