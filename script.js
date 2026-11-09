// ==========================================
// CLASE TRABAJADOR (POO)
// ==========================================
class TrabajadorBonoNavideno {
    constructor(nombre, apellido, area, email, fecha, horasTrabajadas, pagoPorHora, tieneHijos) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.area = area;
        this.email = email;
        this.fecha = fecha;
        this.horasTrabajadas = parseFloat(horasTrabajadas);
        this.pagoPorHora = parseFloat(pagoPorHora);
        this.tieneHijos = (tieneHijos === 'si');
    }

    // Calcula el sueldo bruto (Horas * Pago por hora)
    calcularSueldoBruto() {
        return this.horasTrabajadas * this.pagoPorHora;
    }

    // Calcula el bono según los porcentajes establecidos
    calcularBono(sueldoBruto) {
        let porcentaje = 0;

        if (sueldoBruto <= 2000) {
            porcentaje = 0.10; // 10%
        } else if (sueldoBruto > 2000 && sueldoBruto <= 8000) {
            porcentaje = 0.20; // 20%
        } else {
            porcentaje = 0.25; // 25% (mayor a 8000)
        }

        let bonoCalculado = sueldoBruto * porcentaje;

        // Si tiene hijos, se duplica el bono
        if (this.tieneHijos) {
            bonoCalculado *= 2;
        }

        return bonoCalculado;
    }

    // Procesa todos los valores finales
    obtenerResultados() {
        const sueldoBruto = this.calcularSueldoBruto();
        const bono = this.calcularBono(sueldoBruto);
        const sueldoTotal = sueldoBruto + bono; // Sueldo bruto + bono

        return {
            sueldoBruto: sueldoBruto.toFixed(2),
            bono: bono.toFixed(2),
            sueldoTotal: sueldoTotal.toFixed(2)
        };
    }
}

// ==========================================
// CONTROLADOR DE EVENTOS DE LA VISTA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bonoForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Capturar datos de los campos de la interfaz
        const nombre = document.getElementById('txtNombre').value;
        const apellido = document.getElementById('txtApellido').value;
        const area = document.getElementById('selArea').value;
        const email = document.getElementById('txtEmail').value;
        const fecha = document.getElementById('txtFecha').value;
        const horas = document.getElementById('txtHoras').value;
        const pagoHora = document.getElementById('txtPagoHora').value;
        const tieneHijos = document.querySelector('input[name="hijos"]:checked').value;

        // Instanciar el objeto con POO
        const trabajador = new TrabajadorBonoNavideno(
            nombre, apellido, area, email, fecha, horas, pagoHora, tieneHijos
        );

        // Obtener los cálculos
        const resultados = trabajador.obtenerResultados();

        // Inyectar los resultados directamente en los inputs correspondientes de la tarjeta
        document.getElementById('txtSueldoBruto').value = `$${resultados.sueldoBruto}`;
        document.getElementById('txtBono').value = `$${resultados.bono}`;
        document.getElementById('txtSueldoTotal').value = `$${resultados.sueldoTotal}`;
    });
});