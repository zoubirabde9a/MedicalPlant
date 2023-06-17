using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Model;

namespace Controllers;


[Route("api/[controller]")]
public class PlantController : Controller
{
    DataContext Context;

    public PlantController(DataContext context)
    {
        Context = context;
    }


    [HttpPost]
    [Route("Add")]
    public async Task<ActionResult<Plant>> Add(string name, string description)
    {
        var newPlant = Context.PlantData.Add(new Plant { Name = name, Description = description }).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newPlant).Value);
    }

    [HttpPost]
    [Route("AddContraindication")]
    public async Task<ActionResult<Plant>> AddContraindication(string name)
    {
        var newObject = Context.PlantContraindicationData.Add(new PlantContraindication { Name = name }).Entity;
        await Context.SaveChangesAsync();
        return Ok(Json(newObject).Value);
    }

    [HttpPost]
    [Route("AddContraindicationEntry")]
    public async Task<ActionResult<Plant>> AddContraindicationEntry(int plantId, int contraindicationId)
    {
        var entryList = Context.PlantContraindicationEntryData.Where(entry =>
            entry.PlantId == plantId && entry.PlantContraindicationId == contraindicationId);

        var plantList = Context.PlantData.Where(plant => plant.PlantId == plantId);
        var contraindicationList =
            Context.PlantContraindicationData.Where(contraindication => contraindication.PlantContraindicationId == contraindicationId);

        bool alreadyExists = entryList != null && entryList.Count() > 0;
        bool PlantDoesNotExist = plantList == null || plantList.Count() == 0;
        bool contraindicationDoesNotExist = contraindicationList == null || contraindicationList.Count() == 0;

        if (alreadyExists)
        {
            HttpContext.Response.StatusCode = 500;
            return new JsonResult(new { error = "Entry already exists!" });
        }

        if (PlantDoesNotExist)
        {
            HttpContext.Response.StatusCode = 500;
            return new JsonResult(new { error = "Plant does not exist!" });
        }

        if (contraindicationDoesNotExist)
        {
            HttpContext.Response.StatusCode = 500;
            return new JsonResult(new { error = "Contraindication does not exist!" });
        }

        var newObject = Context.PlantContraindicationEntryData.Add(new PlantContraindicationEntry
        {
            PlantId = plantId,
            PlantContraindicationId = contraindicationId
        }).Entity;

        await Context.SaveChangesAsync();
        return Ok(Json(newObject).Value);
    }


    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<Plant>> Get(int plantId)
    {
        var newObject = Context.PlantData.Where(plant => plant.PlantId == plantId);
        
        var list = newObject.ToList();
        if (list != null && list.Count > 0)
        {
            Plant plant = list[0];

            var entryList = Context.PlantContraindicationEntryData.Where(plantEntry => plantEntry.PlantId == plant.PlantId);
            if (entryList != null)
            {
                plant.PlantContraindicationEntries = entryList.ToList();
            }

            return Ok(Json(plant).Value);
        }
        else
        {

            HttpContext.Response.StatusCode = 500; 
            return new JsonResult(new { error = "Cannot be found!" });         
        }

    }
    
    [HttpGet]
    [Route("GetAll")]
    public async Task<ActionResult<List<Plant>>> GetAll(int offset, int limit)
    {
        return Ok(await Context.PlantData.Skip(offset).Take(limit).ToListAsync());
    }
}