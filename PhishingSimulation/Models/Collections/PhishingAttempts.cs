using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using PhishingSimulation.Models.Enums;

namespace PhishingSimulation.Models.Collections;

public class PhishingAttempts
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }
    
    [BsonElement("email")]
    public string Email { get; set; }
    
    [BsonElement("status")]
    public string Status  { get; set; }
    
    [BsonElement("url")]
    public string Url { get; set; }
    
    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; }
}
