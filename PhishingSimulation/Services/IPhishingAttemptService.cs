using PhishingSimulation.Models.Collections;
using PhishingSimulation.Models.Dtos;

namespace PhishingSimulation.Services;

public interface IPhishingAttemptService
{
    Task<PhishingAttempts> SavePhishingAttempt(PhishingRequest request);
    Task UpdatePhishingAttempt(string phishingAttemptId);
}
