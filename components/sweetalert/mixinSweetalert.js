import Swal from 'sweetalert2'

export const mixinToast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  position: 'top',
  customClass: 'sweetAlert2',
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const mixinAlert = Swal.mixin({
  toast: false,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: 'sweetAlert',
  allowOutsideClick: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const confirmAlert = Swal.mixin({
  toast: false,
  position: 'center',
  showConfirmButton: true,
  showCancelButton: true,
  customClass: 'sweetAlert',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  allowOutsideClick: false
})
