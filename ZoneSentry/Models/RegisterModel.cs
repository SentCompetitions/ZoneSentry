using System.ComponentModel.DataAnnotations;

namespace ZoneSentry.Models;

public class RegisterModel
{
    [Required(ErrorMessage = "Требуеться ФИО")]
    public string? FIO { get; set; }
    
    [Required(ErrorMessage = "Требуеться логин")]
    public string? Username { get; set; }

    [EmailAddress]
    [Required(ErrorMessage = "Требуеться email")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Требуеться пароль")]
    public string? Password { get; set; }
    
    [Required(ErrorMessage = "Требуеться подтверждение пароля")]
    public string? RePassword { get; set; }
}