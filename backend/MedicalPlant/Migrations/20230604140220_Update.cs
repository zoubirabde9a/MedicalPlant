using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicalPlant.Migrations
{
    public partial class Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Removed",
                table: "PlantData",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Removed",
                table: "PlantContraindicationData",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_PlantContraindicationEntryData_PlantId",
                table: "PlantContraindicationEntryData",
                column: "PlantId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlantContraindicationEntryData_PlantData_PlantId",
                table: "PlantContraindicationEntryData",
                column: "PlantId",
                principalTable: "PlantData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlantContraindicationEntryData_PlantData_PlantId",
                table: "PlantContraindicationEntryData");

            migrationBuilder.DropIndex(
                name: "IX_PlantContraindicationEntryData_PlantId",
                table: "PlantContraindicationEntryData");

            migrationBuilder.DropColumn(
                name: "Removed",
                table: "PlantData");

            migrationBuilder.DropColumn(
                name: "Removed",
                table: "PlantContraindicationData");
        }
    }
}
