using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class UpdatePayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConstructionCompanyId",
                table: "RealtyServicePayments",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrdererId",
                table: "RealtyServicePayments",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServicePayments_ConstructionCompanyId",
                table: "RealtyServicePayments",
                column: "ConstructionCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServicePayments_OrdererId",
                table: "RealtyServicePayments",
                column: "OrdererId");

            migrationBuilder.AddForeignKey(
                name: "FK_RealtyServicePayments_AspNetUsers_OrdererId",
                table: "RealtyServicePayments",
                column: "OrdererId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RealtyServicePayments_ConstructionCompanies_ConstructionCompanyId",
                table: "RealtyServicePayments",
                column: "ConstructionCompanyId",
                principalTable: "ConstructionCompanies",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RealtyServicePayments_AspNetUsers_OrdererId",
                table: "RealtyServicePayments");

            migrationBuilder.DropForeignKey(
                name: "FK_RealtyServicePayments_ConstructionCompanies_ConstructionCompanyId",
                table: "RealtyServicePayments");

            migrationBuilder.DropIndex(
                name: "IX_RealtyServicePayments_ConstructionCompanyId",
                table: "RealtyServicePayments");

            migrationBuilder.DropIndex(
                name: "IX_RealtyServicePayments_OrdererId",
                table: "RealtyServicePayments");

            migrationBuilder.DropColumn(
                name: "ConstructionCompanyId",
                table: "RealtyServicePayments");

            migrationBuilder.DropColumn(
                name: "OrdererId",
                table: "RealtyServicePayments");
        }
    }
}
