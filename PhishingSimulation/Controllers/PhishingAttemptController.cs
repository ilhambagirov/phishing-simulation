using Microsoft.AspNetCore.Mvc;
using PhishingSimulation.Attributes;
using PhishingSimulation.Models.Dtos;
using PhishingSimulation.Services;

namespace PhishingSimulation.Controllers;

[ApiController]
public class PhishingAttemptController(IPhishingAttemptService phishingAttemptService) : Controller
{
    [CheckAccessKey]
    [HttpPost("/phishing/send")]
    public async Task<ActionResult> CreatePhishingAttempt([FromBody] PhishingRequest request)
    {
        return Ok(await phishingAttemptService.SavePhishingAttempt(request));
    }
    
    [HttpGet("/phishing/{id}")]
    public async Task<ActionResult> UpdatePhishingAttempt(string id)
    {
        await phishingAttemptService.UpdatePhishingAttempt(id);
        return NoContent();
    }
}
