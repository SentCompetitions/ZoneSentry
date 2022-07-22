using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ZoneSentry.Models;

public class ApplicationUser : IdentityUser<int>
{
    [Required]
    public ApplicationUserType Type { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Patronymic { get; set; }
    
    public List<Realty> OwnedRealties { get; set; }

    public ConstructionCompany? ConstructionCompany { get; set; }
}

public enum ApplicationUserType
{
    User,
    ConstructionCompanyAdmin,
    ServiceProvider
}

public class ApplicationUserDTO {
    public int Id { get; set; }
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Patronymic { get; set; }
    public string Email { get; set; }
    [Required]
    public ApplicationUserType Type { get; set; }
}