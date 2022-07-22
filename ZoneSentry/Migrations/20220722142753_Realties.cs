using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class Realties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConstructionCompanyId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Patronymic",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ConstructionCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Country = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConstructionCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ResidentialComplexes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    ConstructionCompanyId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResidentialComplexes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResidentialComplexes_ConstructionCompanies_ConstructionCompanyId",
                        column: x => x.ConstructionCompanyId,
                        principalTable: "ConstructionCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Houses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Street = table.Column<string>(type: "TEXT", nullable: false),
                    HouseNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    Building = table.Column<int>(type: "INTEGER", nullable: true),
                    District = table.Column<string>(type: "TEXT", nullable: true),
                    Housing = table.Column<int>(type: "INTEGER", nullable: true),
                    ResidentialComplexId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Houses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Houses_ResidentialComplexes_ResidentialComplexId",
                        column: x => x.ResidentialComplexId,
                        principalTable: "ResidentialComplexes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Realties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Number = table.Column<int>(type: "INTEGER", nullable: false),
                    HouseId = table.Column<int>(type: "INTEGER", nullable: false),
                    OwnerId = table.Column<int>(type: "INTEGER", nullable: true),
                    OwnedByCompany = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Realties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Realties_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Realties_Houses_HouseId",
                        column: x => x.HouseId,
                        principalTable: "Houses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RentAgreements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PaymentPerMonth = table.Column<int>(type: "INTEGER", nullable: false),
                    RealtyId = table.Column<int>(type: "INTEGER", nullable: false),
                    OwnerId = table.Column<int>(type: "INTEGER", nullable: false),
                    TenantId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentAgreements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentAgreements_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RentAgreements_AspNetUsers_TenantId",
                        column: x => x.TenantId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RentAgreements_Realties_RealtyId",
                        column: x => x.RealtyId,
                        principalTable: "Realties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RentPayments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Payment = table.Column<int>(type: "INTEGER", nullable: false),
                    RentAgreementId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentPayments_RentAgreements_RentAgreementId",
                        column: x => x.RentAgreementId,
                        principalTable: "RentAgreements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ConstructionCompanyId",
                table: "AspNetUsers",
                column: "ConstructionCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Houses_ResidentialComplexId",
                table: "Houses",
                column: "ResidentialComplexId");

            migrationBuilder.CreateIndex(
                name: "IX_Realties_HouseId",
                table: "Realties",
                column: "HouseId");

            migrationBuilder.CreateIndex(
                name: "IX_Realties_OwnerId",
                table: "Realties",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_RentAgreements_OwnerId",
                table: "RentAgreements",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_RentAgreements_RealtyId",
                table: "RentAgreements",
                column: "RealtyId");

            migrationBuilder.CreateIndex(
                name: "IX_RentAgreements_TenantId",
                table: "RentAgreements",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_RentPayments_RentAgreementId",
                table: "RentPayments",
                column: "RentAgreementId");

            migrationBuilder.CreateIndex(
                name: "IX_ResidentialComplexes_ConstructionCompanyId",
                table: "ResidentialComplexes",
                column: "ConstructionCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ConstructionCompanies_ConstructionCompanyId",
                table: "AspNetUsers",
                column: "ConstructionCompanyId",
                principalTable: "ConstructionCompanies",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ConstructionCompanies_ConstructionCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "RentPayments");

            migrationBuilder.DropTable(
                name: "RentAgreements");

            migrationBuilder.DropTable(
                name: "Realties");

            migrationBuilder.DropTable(
                name: "Houses");

            migrationBuilder.DropTable(
                name: "ResidentialComplexes");

            migrationBuilder.DropTable(
                name: "ConstructionCompanies");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ConstructionCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ConstructionCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Patronymic",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "AspNetUsers");
        }
    }
}
