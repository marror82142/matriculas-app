package matriculas.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import matriculas.models.dao.IProgramaDao;
import matriculas.models.entity.Programa;

@Service
public class ProgramaServiceImpl implements IProgramaService {

	@Autowired
	private IProgramaDao programaDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Programa> findAll() {
		return (List<Programa>) programaDao.findAll();
	}

	@Override
	@Transactional
	public Programa save(Programa programa) {
		return programaDao.save(programa);
	}

	@Override
	@Transactional(readOnly = true)
	public Programa findById(Long codigo) {
		return programaDao.findById(codigo).orElse(null);
	}

	@Override
	@Transactional
	public void delete(Long codigo) {
		programaDao.deleteById(codigo);
	}

}
