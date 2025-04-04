// proveedores.js
document.addEventListener('DOMContentLoaded', function() {
    // Contador para IDs únicos de servicios
    let servicioCounter = 0;
    
    // Referencias a elementos del DOM
    const serviciosContainer = document.getElementById('servicios-container');
    const btnAgregarServicio = document.getElementById('btn-agregar-servicio');
    const tipoCertificacion = document.getElementById('tipo-certificacion');
    const otraCertificacionGroup = document.getElementById('otra-certificacion-group');
    
    // Manejar el cambio en el tipo de certificación
    tipoCertificacion.addEventListener('change', function() {
        otraCertificacionGroup.style.display = this.value === 'otro' ? 'block' : 'none';
    });
    
    // Agregar un nuevo servicio
    btnAgregarServicio.addEventListener('click', agregarServicio);
    

    agregarServicio();
    

    document.getElementById('registro-proveedor-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registrarProveedor();
    });
    
    // Función para agregar un nuevo servicio
    function agregarServicio() {
        const template = document.getElementById('servicio-template');
        const clone = template.content.cloneNode(true);
        const servicioItem = clone.querySelector('.servicio-item');
        
        // Actualizar IDs para evitar duplicados
        servicioCounter++;
        const idSuffix = servicioCounter;
        
        // Actualizar IDs y for de los checkboxes
        const checkboxes = servicioItem.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            const oldId = cb.id.split('-')[0];
            cb.id = `${oldId}-${idSuffix}`;
            cb.nextElementSibling.htmlFor = `${oldId}-${idSuffix}`;
        });
        
        // Agregar evento para eliminar servicio
        const btnRemove = servicioItem.querySelector('.btn-remove-service');
        btnRemove.addEventListener('click', function() {
            if (serviciosContainer.children.length > 1) {
                serviciosContainer.removeChild(servicioItem);
            } else {
                alert('Debe tener al menos un servicio');
            }
        });
        
        serviciosContainer.appendChild(servicioItem);
    }
    
    // Función para registrar el proveedor
    async function registrarProveedor() {
        const form = document.getElementById('registro-proveedor-form');
        const formData = new FormData(form);
        
        // Validar contraseñas
        const contrasena = formData.get('contrasena_proveedor');
        const confirmarContrasena = formData.get('confirmar_contrasena_proveedor');
        
        if (contrasena !== confirmarContrasena) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Recolectar datos de servicios
        const servicios = [];
        const servicioItems = document.querySelectorAll('.servicio-item');
        
        servicioItems.forEach(item => {
            const servicio = {
                tipo: item.querySelector('[name="tipo_servicio[]"]').value,
                descripcion: item.querySelector('[name="descripcion_servicio[]"]').value,
                experiencia: item.querySelector('[name="experiencia_servicio[]"]').value,
                actividades: Array.from(item.querySelectorAll('[name="actividades[]"]:checked')).map(cb => cb.value),
                otra_actividad: item.querySelector('[name="otra_actividad[]"]').value
            };
            servicios.push(servicio);
        });
        
        // Crear objeto con los datos del proveedor
        const proveedorData = {
            nombre_empresa: formData.get('nombre_empresa'),
            ruc: formData.get('ruc'),
            anios_operacion: formData.get('anios_operacion'),
            descripcion: formData.get('descripcion_empresa'),
            email: formData.get('email_empresa'),
            telefono: formData.get('telefono_empresa'),
            direccion: formData.get('direccion_empresa'),
            sitio_web: formData.get('sitio_web'),
            certificado_eco: formData.get('certificado_eco') === 'on',
            tipo_certificacion: formData.get('tipo_certificacion'),
            otra_certificacion: formData.get('otra_certificacion'),
            contrasena: contrasena,
            servicios: servicios
        };
        
        try {
            // Enviar datos al servidor
            const response = await fetch('/api/proveedores/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(proveedorData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Registro exitoso! Bienvenido ' + data.nombre_empresa);
                // Redirigir al dashboard del proveedor
                window.location.href = 'proveedor-dashboard.html';
            } else {
                throw new Error(data.message || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar proveedor: ' + error.message);
        }
    }
});