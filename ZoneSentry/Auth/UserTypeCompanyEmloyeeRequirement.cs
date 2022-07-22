using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Auth;

public class UserTypeCompanyEmployeeRequirement : IAuthorizationRequirement
{
    public UserTypeCompanyEmployeeRequirement()
    {
    }
}

public class UserTypeCompanyEmployeeAuthorizationHandler : AuthorizationHandler<UserTypeCompanyEmployeeRequirement>
{
    private readonly ApplicationDbContext _db;
    public UserTypeCompanyEmployeeAuthorizationHandler(ApplicationDbContext db)
    {
        _db = db;
    }
    
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UserTypeCompanyEmployeeRequirement requirement)
    {
        if (!context.User.HasClaim(x => x.Type == ClaimTypes.Name))
            return Task.CompletedTask;
        
        var id = int.Parse(context.User.Claims.First(c => c.Type == ClaimTypes.Name).Value);

        if (_db.Users.First((u) => u.Id == id).Type == ApplicationUserType.ConstructionCompanyAdmin)
        {
           context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}