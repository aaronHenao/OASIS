package com.udem.reservas.backend.model;

public class Usuario {
	private String nombre;
    private String apellidos;
    private String cedula;
    private String correoInstitucional;
    private String contrasena;

    public Usuario() {}

    public Usuario(String nombre, String apellidos, String cedula, String correoInstitucional, String contrasena) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.cedula = cedula;
        this.correoInstitucional = correoInstitucional;
        this.contrasena = contrasena;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }

    public String getCorreoInstitucional() { return correoInstitucional; }
    public void setCorreoInstitucional(String correoInstitucional) { this.correoInstitucional = correoInstitucional; }

	public String getContrasena() {	return contrasena;	}

	public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    
}
