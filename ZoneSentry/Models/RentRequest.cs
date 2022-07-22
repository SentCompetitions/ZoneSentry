namespace ZoneSentry.Models;

public class RentRequest
{
    public int Id { get; set; }
    
    public int PaymentPerMonth { get; set; } 
    public int DurationInMonths { get; set; }
    
    public Realty Realty { get; set; }
    public ApplicationUser Tenant { get; set; }
}

public class RentRequestDTO
{
    public int Id { get; set; }
    
    public int PaymentPerMonth { get; set; } 
    public int DurationInMonths { get; set; }
    
    public RealtyUserView Realty { get; set; }
    public ApplicationUserDTO Tenant { get; set; }
}

public class RentRequestCreate
{
    public int DurationInMonths { get; set; }
    
    public int RealtyId { get; set; }
}