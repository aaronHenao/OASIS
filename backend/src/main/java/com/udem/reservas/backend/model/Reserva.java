package com.udem.reservas.backend.model;



public class Reserva {
    private String correoUsuario;
    private String nombreEscenario;
    private String fecha;
    private String horaInicio;
    private String estado;

    public Reserva(String correoUsuario, String nombreEscenario, String fecha, String horaInicio, String estado) {
        this.correoUsuario = correoUsuario;
        this.nombreEscenario = nombreEscenario;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.estado = estado;
    }

    // Getters y Setters
    public String getCorreoUsuario() {
        return correoUsuario;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }

    public String getNombreEscenario() {
        return nombreEscenario;
    }

    public void setNombreEscenario(String nombreEscenario) {
        this.nombreEscenario = nombreEscenario;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}