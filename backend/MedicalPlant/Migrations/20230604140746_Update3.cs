using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicalPlant.Migrations
{
    public partial class Update3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PlantData",
                newName: "PlantId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PlantContraindicationEntryData",
                newName: "PlantContraindicationEntryId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PlantContraindicationData",
                newName: "PlantContraindicationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlantId",
                table: "PlantData",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "PlantContraindicationEntryId",
                table: "PlantContraindicationEntryData",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "PlantContraindicationId",
                table: "PlantContraindicationData",
                newName: "Id");
        }
    }
}
