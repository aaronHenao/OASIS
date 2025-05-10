package com.udem.reservas.backend.model;

public class Escenario {
    private String nombre;
    private boolean disponible;

    public Escenario() {}

    public Escenario(String nombre, boolean disponible) {
        this.nombre = nombre;
        this.disponible = disponible;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
}