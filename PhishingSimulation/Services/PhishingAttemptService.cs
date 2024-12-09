using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using PhishingSimulation.Models;
using PhishingSimulation.Models.Collections;
using PhishingSimulation.Models.Dtos;
using PhishingSimulation.Models.Enums;
using static System.Int32;

namespace PhishingSimulation.Services;

public class PhishingAttemptService : IPhishingAttemptService
{
    private readonly IMongoDatabase _db;
    private readonly IConfiguration _configuration;
    private readonly EmailSettings _emailSettings;

    public PhishingAttemptService(
        IMongoDatabase db,
        IConfiguration configuration,
        IOptions<EmailSettings> emailSettings)
    {
        _db = db;
        _configuration = configuration;
        _emailSettings = emailSettings.Value;
    }

    public async Task<PhishingAttempts> SavePhishingAttempt(PhishingRequest request)
    {
        var client = new SmtpClient(_emailSettings.Host, Parse(_emailSettings.Port))
        {
            Credentials = new NetworkCredential(_emailSettings.User, _emailSettings.Pwd),
            EnableSsl = true
        };

        var objectId = ObjectId.GenerateNewId();
        var newPhishingAttempt = new PhishingAttempts()
        {
            Id = objectId,
            Email = request.Email,
            Url = $"http://localhost:5296/phishing/{objectId}",
            Status = PhishingAttemptStatus.UnClicked.ToString(),
            CreatedAt = DateTime.Now
        };
        var collection = _db.GetCollection<PhishingAttempts>(_configuration["Mongo:collection"]);
        await collection.InsertOneAsync(newPhishingAttempt);

        var mailMessage = new MailMessage
        {
            From = new MailAddress(_emailSettings.From),
            To = { new MailAddress(request.Email) },
            Subject = "Click it!",
            Body = $"Please click this URL: {newPhishingAttempt.Url}",
            IsBodyHtml = false
        };

        Task.Run(async () =>
        {
            try
            {
                await client.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        });

        return newPhishingAttempt;
    }

    public async Task UpdatePhishingAttempt(string phishingAttemptId)
    {
        var collection = _db.GetCollection<PhishingAttempts>(_configuration["Mongo:collection"]);
        var update = Builders<PhishingAttempts>.Update.Set(pa => pa.Status, PhishingAttemptStatus.Clicked.ToString());
        var result = await collection.UpdateOneAsync(
            Builders<PhishingAttempts>.Filter.Eq(pa => pa.Id, new ObjectId(phishingAttemptId)),
            update);

        if (!result.IsAcknowledged)
            throw new Exception("Not Found.");
    }
}
