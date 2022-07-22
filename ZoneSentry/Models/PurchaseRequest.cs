namespace ZoneSentry.Models;

public class PurchaseRequest
{
    public int Id { get; set; }
    public int SellCost { get; set; }

    public Realty Realty { get; set; }
    public ApplicationUser NewOwner { get; set; }
}

public class PurchaseRequestDTO
{
    public int Id { get; set; }
    
    public int PaymentPerMonth { get; set; } 
    public int DurationInMonths { get; set; }
    
    public RealtyUserView Realty { get; set; }
    public ApplicationUserDTO Tenant { get; set; }
}

public class PurchaseRequestCreate
{
    public int RealtyId { get; set; }
}