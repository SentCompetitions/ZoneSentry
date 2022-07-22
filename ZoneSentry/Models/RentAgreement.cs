namespace ZoneSentry.Models;

public class RentAgreement
{
    public int Id { get; set; }
    
    public DateTime Date { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int PaymentPerMonth { get; set; }
    
    public Realty Realty { get; set; }
    public ApplicationUser Owner { get; set; }
    public ApplicationUser Tenant { get; set; }
    
    public List<RentPayment> Payments { get; set; }
}