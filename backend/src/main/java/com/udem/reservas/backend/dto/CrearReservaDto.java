    package com.udem.reservas.backend.dto;

   

    public class CrearReservaDto {
        private String correoUsuario;
        private String nombreEscenario;
        private String fecha;
        private String horaInicio;

        public CrearReservaDto() {
        }

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
    }