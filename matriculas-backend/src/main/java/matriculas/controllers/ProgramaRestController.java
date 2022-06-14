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
	public Programa show(@RequestParam Long codigo, 
							@RequestParam String nombrePrograma
							){
		
		Programa programa = new Programa();
		programa.setCodigo(codigo);
		programa.setNombrePrograma(nombrePrograma);

		return create(programa);
	}
	
	/*  Duda sobre "Login" para programa
	@GetMapping("/usuarios/login")
	public Usuario login(	@RequestParam String nombreUsuario,
							@RequestParam String contrasena){	
		Usuario usr = null;
		List<Usuario> usuarios = usuarioService.findAll();
		for (int i = 0; i < usuarios.size(); i++) {
			if(usuarios.get(i).getNombreUsuario().equals(nombreUsuario)
					&& usuarios.get(i).getContrasena().equals(contrasena)) {
					usr = usuarios.get(i);
				}
		}
		if(usr == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
		}
		return usr;
	}
	*/
	
	@PostMapping("/programas")
	@ResponseStatus(HttpStatus.CREATED)
	public Programa create(@RequestBody Programa programa){			
		return programaService.save(programa);		
	}
	
	//Actualizar programa
	@PutMapping("/programas/{codigo}")
	public Programa update(@RequestBody Programa programa, @PathVariable Long codigo){
		Programa current = programaService.findById(codigo);
		
		current.setCodigo(programa.getPrograma());
		current.setNombrePrograma(programa.getNombrePrograma());

		return programaService.save(current);
	}
	
	//Eliminar programa
	@DeleteMapping("/usuarios/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long codigo){
		programaService.delete(codigo);
	}
}
