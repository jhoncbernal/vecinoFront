export const ErroDictionary=()=>{ 
const Errors= new Map<string, string>();
Errors.set("product already exist","El producto ya existe"); 
Errors.set("vehicle already exist","El vehiculo ya existe");
Errors.set("token must be sent","Su codigo de seguridad debe ser enviado");
Errors.set("validate token value","Valide  su codigo de seguridad");
Errors.set("Validate token access or token value","No tiene permiso para ejecutar esta accion");
Errors.set("For owner role secretKey must be sent","Se debe enviar la clave secreta");
Errors.set("Invalid secretKey","Clave secreta invalida");
Errors.set("username or email already exist","El nombre de usuario o el correo ya exite");
Errors.set("User already exist","El usuario ya existe");
Errors.set("Invalid Password","Contraseña invalida");
Errors.set("Validate user role access","Permisos insuficientes");
Errors.set("The email address is not associated with any account. Double-check your email address and try again.","La dirección de correo electrónico no está asociada a ninguna cuenta. Vuelva a verificar su dirección de correo electrónico e intente nuevamente");
Errors.set("Password reset token is invalid or has expired.","El restablecimiento de contraseña no es válido o ha expirado.");
Errors.set("Verify token is invalid or has expired.","Su codigo de seguridad ha expirado o es invalido");
Errors.set("User disabled","Usuario inhabilitado");
Errors.set("id must be sent","El Id debe ser enviado");
Errors.set("entity does not found","entidad no encontrada");
Errors.set("parkingspaceId and positionnumber must be sent","El espacio o la posición debe ser enviada");
Errors.set("positionnumber or parkingspaceId not found!","No se encotro el espacio o la posición");
Errors.set("vehicle already exist","El vehiculo ya existe");
Errors.set("Internal server error","Error Interno comuniquese con soporte tecnico si esto persiste");
Errors.set("User has not been verified","Verifique su correo");
Errors.set("email does not exist","No se encontro el correo ingresado");
Errors.set("username does not exist","No se encontro el nombre de usuario ingresado");
Errors.set("Network Error","Error de conexion con el servidor comuniquese con soporte tecnico si esto persiste");
Errors.set("Verify account email","Se ha re enviado el correo de verificacion con 1 hora de vigencia");

return {
    Errors
}}