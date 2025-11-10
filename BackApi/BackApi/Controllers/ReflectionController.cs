using Microsoft.AspNetCore.Mvc;
using IImporter;
using System.Reflection;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;

        public ReflectionController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpGet("importers")]
        public ActionResult<string[]> GetImporters()
        {
            var reflectionPath = Path.Combine(_environment.ContentRootPath, "reflection");
            var dllNames = new List<string>();

            if (!Directory.Exists(reflectionPath))
            {
                return Ok(Array.Empty<string>());
            }

            var dllPaths = Directory.GetFiles(reflectionPath, "*.dll", SearchOption.TopDirectoryOnly);

            foreach (var dllPath in dllPaths)
            {
                try
                {
                    Assembly assembly = Assembly.LoadFrom(dllPath);

                    Type[] types;
                    try
                    {
                        types = assembly.GetTypes();
                    }
                    catch (ReflectionTypeLoadException ex)
                    {
                        types = ex.Types.Where(t => t != null).Cast<Type>().ToArray();
                    }

                    bool hasValidImporter = types
                        .Any(type => type.IsPublic 
                            && !type.IsAbstract 
                            && !type.IsInterface
                            && typeof(ImporterInterface).IsAssignableFrom(type));

                    if (hasValidImporter)
                    {
                        dllNames.Add(Path.GetFileName(dllPath));
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine($"Failed to load assembly from {dllPath}");
                }
            }

            return Ok(dllNames.ToArray());
        }
    }
}
