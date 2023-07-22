using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MedicalPlant.Migrations
{
    public partial class update356 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "PlantContraindicationData",
                newName: "LatinName");

            migrationBuilder.CreateTable(
                name: "PlantConstituentData",
                columns: table => new
                {
                    PlantConstituentId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantConstituentData", x => x.PlantConstituentId);
                });

            migrationBuilder.CreateTable(
                name: "PlantConstituentEntryData",
                columns: table => new
                {
                    PlantConstituentEntryId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlantId = table.Column<long>(type: "bigint", nullable: false),
                    PlantConstituentId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantConstituentEntryData", x => x.PlantConstituentEntryId);
                });

            migrationBuilder.CreateTable(
                name: "PlantEffectData",
                columns: table => new
                {
                    PlantEffectId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantEffectData", x => x.PlantEffectId);
                });

            migrationBuilder.CreateTable(
                name: "PlantEffectEntryData",
                columns: table => new
                {
                    PlantEffectEntryId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlantId = table.Column<long>(type: "bigint", nullable: false),
                    PlantEffectId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantEffectEntryData", x => x.PlantEffectEntryId);
                });

            migrationBuilder.CreateTable(
                name: "PlantIndicationData",
                columns: table => new
                {
                    PlantIndicationId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantIndicationData", x => x.PlantIndicationId);
                });

            migrationBuilder.CreateTable(
                name: "PlantIndicationEntryData",
                columns: table => new
                {
                    PlantIndicationEntryId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlantId = table.Column<long>(type: "bigint", nullable: false),
                    PlantIndicationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantIndicationEntryData", x => x.PlantIndicationEntryId);
                });

            migrationBuilder.CreateTable(
                name: "PlantNegativeEffectData",
                columns: table => new
                {
                    PlantNegativeEffectId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LatinName = table.Column<string>(type: "text", nullable: false),
                    Removed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantNegativeEffectData", x => x.PlantNegativeEffectId);
                });

            migrationBuilder.CreateTable(
                name: "PlantNegativeEffectEntryData",
                columns: table => new
                {
                    PlantNegativeEffectEntryId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlantId = table.Column<long>(type: "bigint", nullable: false),
                    PlantNegativeEffectId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantNegativeEffectEntryData", x => x.PlantNegativeEffectEntryId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlantConstituentData");

            migrationBuilder.DropTable(
                name: "PlantConstituentEntryData");

            migrationBuilder.DropTable(
                name: "PlantEffectData");

            migrationBuilder.DropTable(
                name: "PlantEffectEntryData");

            migrationBuilder.DropTable(
                name: "PlantIndicationData");

            migrationBuilder.DropTable(
                name: "PlantIndicationEntryData");

            migrationBuilder.DropTable(
                name: "PlantNegativeEffectData");

            migrationBuilder.DropTable(
                name: "PlantNegativeEffectEntryData");

            migrationBuilder.RenameColumn(
                name: "LatinName",
                table: "PlantContraindicationData",
                newName: "Name");
        }
    }
}
