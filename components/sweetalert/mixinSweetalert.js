import Swal from 'sweetalert2'

export const mixinToast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  position: 'center',
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const mixinAlert = Swal.mixin({
  toast: false,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: 'sweetAlert',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
