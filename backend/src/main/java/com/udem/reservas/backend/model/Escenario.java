package com.udem.reservas.backend.model;

import java.util.ArrayList;
import java.util.List;

public class Escenario {
    private String nombre;
    private boolean disponible;
    private List<Reserva> reservas;

    public Escenario(String nombre) {
        this.nombre = nombre;
        this.disponible = true;
        this.reservas = new ArrayList<>();
    }

    // Getter y Setter para nombre
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Getter y Setter para disponible
    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    // Getter y Setter para reservas
    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    // Método para agregar una reserva
    public boolean agregarReserva(Reserva reserva) {
        if (reservas.stream().anyMatch(r -> r.getHoraInicio().equals(reserva.getHoraInicio()) && r.getEstado().equals("Confirmada"))) {
            return false; // El horario ya está reservado
        }
        reservas.add(reserva);
        return true;
    }
}