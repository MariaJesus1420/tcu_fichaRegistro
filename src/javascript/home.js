import '../css/home.css'
import '../css/events.css'
import { DATABASE } from './Classes/DataBase'
import { v4 as uuidv4 } from 'uuid'
import { Card } from './Classes/Card'
import { CuestionarioLoader } from './Classes/CuestionarioLoader'

export const HOME = {
  init: async () => {

    
    let eventoId
    const generateEventsList = eventsDB => {
      let eventsList = []

      let eventsDBArray = Object.values(eventsDB)
      for (let index = 0; index < eventsDBArray.length; index++) {
        eventsList.push({
          id: eventsDBArray[index].id,
          descripcion: eventsDBArray[index].descripcion,
          organizacion: eventsDBArray[index].organizacion,
          start: new Date(
            eventsDBArray[index].start.seconds * 1000
          ).toISOString(),
          end: new Date(eventsDBArray[index].end.seconds * 1000).toISOString(),
          title: eventsDBArray[index].title
        })
      }

      return eventsList
    }

    const eventoClick = async info => {
     

      $("#cuestionariosWrapper").empty()
      
      $(".eventoInfo").hide()

      $(".spinner-border").show()
      let cuestionariosWrapper = document.querySelector('#cuestionariosWrapper')

    

      let clickedEvent = info.event

      let db = new DATABASE()
      let eventListDB = await db.obtenerDocumento('Events', '2021')
      eventoId = clickedEvent.id

      let modalEvent = new bootstrap.Modal($("#modalEvent"))

      modalEvent.show()


      if (eventListDB[eventoId].cuestionarios == undefined || eventListDB[eventoId].cuestionarios.length === 0) {

        let labelCuestionarios = document.createElement('label')
        labelCuestionarios.innerText = 'Este evento no tiene formularios asociadios.';
        cuestionariosWrapper.append(labelCuestionarios)
      } else {
     
      
        $('#modalEvent').one("shown.bs.modal", async function () {
       
          let desc = document.querySelector('#labelDesc')
          desc.innerText = clickedEvent.extendedProps.descripcion;

          for (let index = 0; index < eventListDB[eventoId].cuestionarios.length; index++) { 
          
            let cuestionario = eventListDB[eventoId].cuestionarios[index]

            let cuestionarioDB = await db.obtenerDocumento(
              'Cuestionarios',
              cuestionario
            )

            //    await db.addForm(object);

            cuestionariosWrapper.append(
              await new Card(
                cuestionarioDB.titulo,
                cuestionarioDB.descripcion,
                cuestionario,
                cuestionarioDB.Respuestas
              ).generateCard("2021", eventoId, cuestionarioDB, cuestionario)
            )

          }
          $(".spinner-border").hide()

          $(".eventoInfo").show()

        })
      }
    }

    let eventoSeleccionado
    const generateCalendar = eventList => {
      var calendarEl = document.getElementById('calendar')

      var calendar = new FullCalendar.Calendar(calendarEl, {
        eventClick: eventoClick,
        
        eventOverlap: false,
        themeSystem: 'bootstrap',
        height: 600,
        navLinks: true,
        locale: 'es',
        aspectRatio: 2,
        expandRows: false,

        initialView: 'listMonth',
        buttonText: {
          listMonth: 'Agenda',
          month: "Mensual",
          today: "Hoy",
        },
        footerToolbar: {
          start: 'today',
          end: 'prev,next'
        },
        headerToolbar: {
          left: 'title',
          end: 'dayGridMonth listMonth'
        },
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        },
        views: {
          timeGridWeek: {
            displayEventTime: true
          },
          dayGridMonth: {
            displayEventEnd: true
          }
        }
      })
      calendar.render()
    
      return calendar
    }

    function getFirstProperty(obj) {
      return obj[Object.keys(obj)[0]]
    }

    let calendarObj

    let db = new DATABASE()

    calendarObj = generateCalendar()
  
    let eventsDB = await db.obtenerDocumento('Events', '2021')
    generateEventsList(eventsDB).forEach(event => {
      calendarObj.addEvent(event)
    });

    $('#btnAgregarCuestionario').click(async e => {
      $('#modalEvent').modal('hide')
      $('#modalCuestionarioSelect').modal('show')
      let loader = new CuestionarioLoader()
      let trBody = await loader.loadCuestionarios('2021', eventoId)
      $('#listaCuestionariosWrapper tbody').replaceWith(trBody)

    })
    $('#btnVolverListaCuestionarios').click(e => {
      $('#modalCuestionarioSelect').modal('hide')
      $('#modalEvent').modal('show')

    })
  }
}
