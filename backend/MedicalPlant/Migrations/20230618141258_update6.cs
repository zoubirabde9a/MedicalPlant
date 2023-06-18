using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MedicalPlant.Migrations
{
    public partial class update6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlantClassData",
                columns: table => new
                {
                    PlantClassId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantClassData", x => x.PlantClassId);
                });

            migrationBuilder.CreateTable(
                name: "PlantDivisionData",
                columns: table => new
                {
                    PlantDivisionId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantDivisionData", x => x.PlantDivisionId);
                });

            migrationBuilder.CreateTable(
                name: "PlantFamilyData",
                columns: table => new
                {
                    PlantFamilyId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantFamilyData", x => x.PlantFamilyId);
                });

            migrationBuilder.CreateTable(
                name: "PlantGenreData",
                columns: table => new
                {
                    PlantGenreId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantGenreData", x => x.PlantGenreId);
                });

            migrationBuilder.CreateTable(
                name: "PlantPartData",
                columns: table => new
                {
                    PlantPartId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantPartData", x => x.PlantPartId);
                });

            migrationBuilder.CreateTable(
                name: "PlantSpeciesData",
                columns: table => new
                {
                    PlantSpeciesId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantSpeciesData", x => x.PlantSpeciesId);
                });

            migrationBuilder.CreateTable(
                name: "VegetableReignData",
                columns: table => new
                {
                    VegetableReignId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VegetableReignData", x => x.VegetableReignId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlantClassData");

            migrationBuilder.DropTable(
                name: "PlantDivisionData");

            migrationBuilder.DropTable(
                name: "PlantFamilyData");

            migrationBuilder.DropTable(
                name: "PlantGenreData");

            migrationBuilder.DropTable(
                name: "PlantPartData");

            migrationBuilder.DropTable(
                name: "PlantSpeciesData");

            migrationBuilder.DropTable(
                name: "VegetableReignData");
        }
    }
}
