using ZoneSentry.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ZoneSentry.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
{
    public DbSet<ConstructionCompany> ConstructionCompanies { get; set; } = null!;
    public DbSet<ResidentialComplex> ResidentialComplexes { get; set; } = null!;
    public DbSet<House> Houses { get; set; } = null!;
    public DbSet<Realty> Realties { get; set; } = null!;
    public DbSet<RentAgreement> RentAgreements { get; set; } = null!;
    public DbSet<RentPayment> RentPayments { get; set; } = null!;
    public DbSet<RentRequest> RentRequests { get; set; } = null!;
    public DbSet<PurchaseRequest> PurchaseRequests { get; set; } = null!;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}