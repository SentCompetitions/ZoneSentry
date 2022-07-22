namespace ZoneSentry.Models;

public class Realty
{
    public int Id { get; set; }
    
    public int Number { get; set; }
    
    public House House { get; set; }
    public int HouseId { get; set; }
    
    public ApplicationUser? Owner { get; set; }
    public bool OwnedByCompany { get; set; }
    
    public List<RentAgreement> RentAgreements { get; set; }

    public RentAgreement CurrentRentAgreement => RentAgreements.FirstOrDefault(a => a.Date > DateTime.Now && a.ExpirationDate < DateTime.Now);
}

public class RealtyDTO
{
    public int Id { get; set; }
    
    public int Number { get; set; }
    
    public int HouseId { get; set; }
    
    public ApplicationUserDTO? Owner { get; set; }
    public bool OwnedByCompany { get; set; }
    
    public List<int> RentAgreements { get; set; }

    public int CurrentRentAgreement { get; set; }
}