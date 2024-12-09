using Microsoft.AspNetCore.Mvc.Filters;
using PhishingSimulation.Utils;

namespace PhishingSimulation.Attributes;

public class CheckAccessKeyAttribute : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue("Access-Key", out var accessKey)
            || accessKey != Accessor.AppConfiguration["AccessKey"])
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.HttpContext.Response.WriteAsJsonAsync(new
            {
                context.HttpContext.Response.StatusCode,
                Message = "Invalid Access Key!"
            });
        }
        await next();
    }
}
