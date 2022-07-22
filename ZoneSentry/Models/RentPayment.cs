namespace ZoneSentry.Models;

public class RentPayment
{
    public int Id { get; set; }
    
    public int Payment { get; set; }
    
    public RentAgreement RentAgreement { get; set; }
}