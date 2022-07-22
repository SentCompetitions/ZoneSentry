using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Auth;

public class UserTypeServiceProviderRequirement : IAuthorizationRequirement
{
    public UserTypeServiceProviderRequirement()
    {
    }
}

public class UserTypeServiceProviderAuthorizationHandler : AuthorizationHandler<UserTypeServiceProviderRequirement>
{
    private readonly ApplicationDbContext _db;
    public UserTypeServiceProviderAuthorizationHandler(ApplicationDbContext db)
    {
        _db = db;
    }
    
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserTypeServiceProviderRequirement requirement)
    {
        if (!context.User.HasClaim(x => x.Type == ClaimTypes.Name))
            return Task.CompletedTask;
        
        var id = int.Parse(context.User.Claims.First(c => c.Type == ClaimTypes.Name).Value);

        if (_db.Users.First((u) => u.Id == id).Type == ApplicationUserType.ServiceProvider)
        {
           context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}