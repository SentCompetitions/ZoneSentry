namespace ZoneSentry.Models;

public class RentAgreement
{
    public int Id { get; set; }
    
    public DateTime Date { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int PaymentPerMonth { get; set; }
    
    public Realty Realty { get; set; }
    public ApplicationUser? Owner { get; set; }
    public bool OwnedByCompany { get; set; }
    public ApplicationUser Tenant { get; set; }
    
    public List<RentPayment> Payments { get; set; }
}

public class RentAgreementUserView
{
    public int Id { get; set; }
    
    public DateTime Date { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int PaymentPerMonth { get; set; }
    
    public RealtyUserView Realty { get; set; }
    public ApplicationUserDTO? Owner { get; set; }
    public bool OwnedByCompany { get; set; }
    public ApplicationUserDTO Tenant { get; set; }
}

public class RentAgreementDTO
{
    public int Id { get; set; }
    
    public DateTime Date { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int PaymentPerMonth { get; set; }
    
    public bool OwnedByCompany { get; set; }
    public ApplicationUserDTO Tenant { get; set; }
}