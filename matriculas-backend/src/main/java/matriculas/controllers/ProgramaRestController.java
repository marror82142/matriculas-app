package matriculas.controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import matriculas.models.entity.Programa;
import matriculas.models.services.IProgramaService;


@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProgramaRestController {
	
	@Autowired
	private IProgramaService programaService;
	
	@GetMapping("/programas")
	public List<Programa> index(){
		return programaService.findAll();
	}
	
	@GetMapping("/programas/programa")
	public Programa show(@RequestParam Long id,
							@RequestParam String codigo, 
							@RequestParam String tipo,
							@RequestParam String nombre
							){
		
		Programa programa = new Programa();
		programa.setId(id);
		programa.setCodigo(codigo);
		programa.setTipo(tipo);
		programa.setNombre(nombre);

		return create(programa);
	}
	
	@PostMapping("/programas")
	@ResponseStatus(HttpStatus.CREATED)
	public Programa create(@RequestBody Programa programa){			
		return programaService.save(programa);		
	}
	
	//Actualizar programa
	@PutMapping("/programas/{id}")
	public Programa update(@RequestBody Programa programa, @PathVariable Long id){
		Programa current = programaService.findById(id);
		
		current.setId(programa.getId());
		current.setCodigo(programa.getCodigo());
		current.setTipo(programa.getTipo());
		current.setNombre(programa.getNombre());

		return programaService.save(current);
	}
	
	//Eliminar programa
	@DeleteMapping("/programas/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id){
		programaService.delete(id);
	}
}
