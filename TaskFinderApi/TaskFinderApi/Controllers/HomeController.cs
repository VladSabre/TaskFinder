using Microsoft.AspNetCore.Mvc;

namespace TaskFinder.Api.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        public IActionResult Index()
        {
            return Ok("Contact");
        }
    }
}
