using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class OwnedByCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentAgreements_AspNetUsers_OwnerId",
                table: "RentAgreements");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "RentAgreements",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<bool>(
                name: "OwnedByCompany",
                table: "RentAgreements",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_RentAgreements_AspNetUsers_OwnerId",
                table: "RentAgreements",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentAgreements_AspNetUsers_OwnerId",
                table: "RentAgreements");

            migrationBuilder.DropColumn(
                name: "OwnedByCompany",
                table: "RentAgreements");

            migrationBuilder.AlterColumn<int>(
                name: "OwnerId",
                table: "RentAgreements",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RentAgreements_AspNetUsers_OwnerId",
                table: "RentAgreements",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
