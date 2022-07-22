using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ZoneSentry.Data;
using ZoneSentry.Models;

namespace ZoneSentry.Auth;

public class UserTypeUserRequirement : IAuthorizationRequirement
{
    public UserTypeUserRequirement()
    {
    }
}

public class UserTypeUserAuthorizationHandler : AuthorizationHandler<UserTypeUserRequirement>
{
    private readonly ApplicationDbContext _db;
    public UserTypeUserAuthorizationHandler(ApplicationDbContext db)
    {
        _db = db;
    }
    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, UserTypeUserRequirement requirement)
    {
        if (!context.User.HasClaim(x => x.Type == ClaimTypes.Name))
            return;

        var id = int.Parse(context.User.Claims.First(c => c.Type == ClaimTypes.Name).Value);

        if ((await _db.Users.FirstAsync((u) => u.Id == id)).Type == ApplicationUserType.User)
        {
           context.Succeed(requirement);
        }

        return;
    }
}