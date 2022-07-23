using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZoneSentry.Migrations
{
    public partial class AddOrderer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RealtyServicePayments_RealtyServiceOrders_RealtyServiceOrderId",
                table: "RealtyServicePayments");

            migrationBuilder.RenameColumn(
                name: "Active",
                table: "RealtyServiceOrders",
                newName: "CompanyOrdered");

            migrationBuilder.AddColumn<bool>(
                name: "CompanyOrdered",
                table: "RealtyServiceRequests",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "OrdererId",
                table: "RealtyServiceRequests",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RealtyServiceOrderId",
                table: "RealtyServicePayments",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "OrdererId",
                table: "RealtyServiceOrders",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServiceRequests_OrdererId",
                table: "RealtyServiceRequests",
                column: "OrdererId");

            migrationBuilder.CreateIndex(
                name: "IX_RealtyServiceOrders_OrdererId",
                table: "RealtyServiceOrders",
                column: "OrdererId");

            migrationBuilder.AddForeignKey(
                name: "FK_RealtyServiceOrders_AspNetUsers_OrdererId",
                table: "RealtyServiceOrders",
                column: "OrdererId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RealtyServicePayments_RealtyServiceOrders_RealtyServiceOrderId",
                table: "RealtyServicePayments",
                column: "RealtyServiceOrderId",
                principalTable: "RealtyServiceOrders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RealtyServiceRequests_AspNetUsers_OrdererId",
                table: "RealtyServiceRequests",
                column: "OrdererId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RealtyServiceOrders_AspNetUsers_OrdererId",
                table: "RealtyServiceOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_RealtyServicePayments_RealtyServiceOrders_RealtyServiceOrderId",
                table: "RealtyServicePayments");

            migrationBuilder.DropForeignKey(
                name: "FK_RealtyServiceRequests_AspNetUsers_OrdererId",
                table: "RealtyServiceRequests");

            migrationBuilder.DropIndex(
                name: "IX_RealtyServiceRequests_OrdererId",
                table: "RealtyServiceRequests");

            migrationBuilder.DropIndex(
                name: "IX_RealtyServiceOrders_OrdererId",
                table: "RealtyServiceOrders");

            migrationBuilder.DropColumn(
                name: "CompanyOrdered",
                table: "RealtyServiceRequests");

            migrationBuilder.DropColumn(
                name: "OrdererId",
                table: "RealtyServiceRequests");

            migrationBuilder.DropColumn(
                name: "OrdererId",
                table: "RealtyServiceOrders");

            migrationBuilder.RenameColumn(
                name: "CompanyOrdered",
                table: "RealtyServiceOrders",
                newName: "Active");

            migrationBuilder.AlterColumn<int>(
                name: "RealtyServiceOrderId",
                table: "RealtyServicePayments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RealtyServicePayments_RealtyServiceOrders_RealtyServiceOrderId",
                table: "RealtyServicePayments",
                column: "RealtyServiceOrderId",
                principalTable: "RealtyServiceOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
