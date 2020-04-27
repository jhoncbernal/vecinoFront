import React from "react";
import { IonContent, IonCard, IonCardContent, IonTitle, IonText, IonButton } from "@ionic/react";
import config from "../config";
import { HttpRequest } from "../hooks/HttpRequest";
import { Storages } from "../hooks/Storage";
import * as H from "history";
import { User } from "../entities";

interface ContainerProps {
	history:H.History,
	currentUser:User;
	data:any;

  }
export const TermsCondContainer: React.FC<ContainerProps> = ({
    history,
    currentUser,
    data
  }) =>{
	  
return (
    <IonContent>
            <IonCard>
              <IonCardContent>
                <IonTitle color='primary'>
                  <h1>	T&#233;rminos y condiciones Generales</h1></IonTitle>
                  <br/>
                  <br/>
                <IonText color="dark" class="ion-text-justify">
<p>
	Versi&#243;n 01 18/04/2020
</p>
<p>
	Este contrato describe los t&#233;rminos y condiciones generales (los
	"T&#233;rminos y Condiciones Generales") aplicables al uso de los servicios
ofrecidos por Vecinoo SAS. ("los Servicios") dentro del sitio	<a href="https://vecinofront.herokuapp.com/">www. Vecinoo.com.co</a>,
	aplicativo (Vecinoo APP) Cualquier persona que desee acceder y/o usar el
	sitio o los servicios podr&#225; hacerlo sujet&#225;ndose a los
	T&#233;rminos y Condiciones Generales, junto con todas las dem&#225;s
	pol&#237;ticas y principios que rigen y que son incorporados al presente
	por referencia.
</p>
<p>
	<strong>
		CUALQUIER PERSONA QUE NO ACEPTE ESTOS T&#201;RMINOS Y CONDICIONES
		GENERALES, LOS CUALES TIENEN UN CAR&#193;CTER OBLIGATORIO Y VINCULANTE,
		DEBER&#193; ABSTENERSE DE UTILIZAR EL SITIO Y/O LOS SERVICIOS.
	</strong>
</p>
<p>
	El Usuario debe leer, entender y aceptar todas las condiciones establecidas
	en los T&#233;rminos y Condiciones Generales y en las Pol&#237;ticas de
	Privacidad as&#237; como en los dem&#225;s documentos incorporados a los
	mismos por referencia, previo a su inscripci&#243;n como Usuario de Vecinoo
</p>
<ol>
	<li>
		Capacidad
	</li>
</ol>
<p>
	Los Servicios s&#243;lo est&#225;n disponibles para personas que tengan
	capacidad legal para contratar. No podr&#225;n utilizar los servicios las
	personas que no tengan esa capacidad, los menores de edad o Usuarios de
	Vecinoo que hayan sido suspendidos temporalmente o inhabilitados
	definitivamente. Si est&#225;s inscribiendo un Usuario como Empresa, debes
	tener capacidad para contratar a nombre de tal entidad y de obligar a la
	misma en los t&#233;rminos de este Acuerdo.
</p>
<ol>
	<li>
		Inscripci&#243;n
	</li>
</ol>
<p>
	Es obligatorio completar el formulario de inscripci&#243;n en todos sus
	campos con datos v&#225;lidos para poder utilizar los servicios que brinda
	Vecinoo. El futuro Usuario deber&#225; completarlo con su informaci&#243;n
	personal de manera exacta, precisa y verdadera ("Datos Personales") y asume
	el compromiso de actualizar los Datos Personales conforme resulte
	necesario.
</p>
<p>
	Vecinoo podr&#225; utilizar diversos medios para identificar a sus
	Usuarios, pero Vecinoo NO se responsabiliza por la certeza de los Datos
	Personales provistos por sus Usuarios. Los Usuarios garantizan y responden,
	en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de
	los Datos Personales ingresados.
</p>
<p>
	Vecinoo se reserva el derecho de solicitar alg&#250;n comprobante y/o dato
	adicional a efectos de corroborar los Datos Personales, as&#237; como de
	suspender temporal o definitivamente a aquellos Usuarios cuyos datos no
	hayan podido ser confirmados. En estos casos de inhabilitaci&#243;n, se
	dar&#225; de baja todos los art&#237;culos publicados, as&#237; como las
	ofertas realizadas, sin que ello genere alg&#250;n derecho a resarcimiento
</p>
<p>
	El Usuario acceder&#225; a su cuenta personal ("Cuenta") mediante el
	ingreso de su Seud&#243;nimo y clave de seguridad personal elegida ("Clave
	de Seguridad"). El Usuario se obliga a mantener la confidencialidad de su
	Clave de Seguridad.
</p>
<p>
	La Cuenta es personal, &#250;nica e intransferible, y est&#225; prohibido
	que un mismo Usuario inscriba o posea m&#225;s de una Cuenta. En caso que
	Vecinoo detecte distintas Cuentas que contengan datos coincidentes o
	relacionados, podr&#225; cancelar, suspender o inhabilitarlas.
</p>
<p>
	El Usuario ser&#225; responsable por todas las operaciones efectuadas en su
	Cuenta, pues el acceso a la misma est&#225; restringido al ingreso y uso de
	su Clave de Seguridad, de conocimiento exclusivo del Usuario. El Usuario se
	compromete a notificar a Vecinoo en forma inmediata y por medio id&#243;neo
	y fehaciente, cualquier uso no autorizado de su Cuenta, as&#237; como el
	ingreso por terceros no autorizados a la misma. Se aclara que est&#225;
	prohibida la venta, cesi&#243;n o transferencia de la Cuenta (incluyendo la
	reputaci&#243;n y calificaciones) bajo ning&#250;n t&#237;tulo
</p>
<p>
	Vecinoo se reserva el derecho de rechazar cualquier solicitud de
	inscripci&#243;n o de cancelar una inscripci&#243;n previamente aceptada,
	sin que est&#233; obligado a comunicar o exponer las razones de su
	decisi&#243;n y sin que ello genere alg&#250;n derecho a indemnizaci&#243;n
	o resarcimiento.
</p>
<ol>
	<li>
		Modificaciones del Acuerdo
	</li>
</ol>
<p>
	Vecinoo podr&#225; modificar los T&#233;rminos y Condiciones Generales en
	cualquier momento haciendo p&#250;blicos en el Sitio los t&#233;rminos
	modificados. Todos los t&#233;rminos modificados entrar&#225;n en vigor a
	los 10 (diez) d&#237;as de su publicaci&#243;n. Dichas modificaciones
	ser&#225;n comunicadas por Vecinoo a los usuarios que en la
	Configuraci&#243;n de su Cuenta de Vecinoo hayan indicado que desean
	recibir notificaciones de los cambios en estos T&#233;rminos y Condiciones.
	Todo usuario que no est&#233; de acuerdo con las modificaciones efectuadas
	por Vecinoo podr&#225; solicitar la baja de la cuenta.
</p>
<p>
	El uso del sitio y/o sus servicios implica la aceptaci&#243;n de estos
	T&#233;rminos y Condiciones generales de uso de Vecinoo.
</p>
<ol>
	<li>
		Listado de productos
	</li>
</ol>
<ol>
	<li>
		Publicaci&#243;n de bienes (Productos)
	</li>
</ol>
<p>
	El Usuario deber&#225; ofrecer a la venta, los bienes y/o servicios en las
	categor&#237;as y subcategor&#237;as apropiadas. Las publicaciones
	podr&#225;n incluir textos descriptivos, gr&#225;ficos, fotograf&#237;as y
	otros contenidos y condiciones pertinentes para la venta del bien o la
	contrataci&#243;n del servicio, siempre que no violen ninguna
	disposici&#243;n de este acuerdo o dem&#225;s pol&#237;ticas de Vecinoo. El
	producto ofrecido por el Usuario Vendedor debe ser exactamente descrito en
	cuanto a sus condiciones y caracter&#237;sticas relevantes. Se entiende y
	presume que mediante la inclusi&#243;n del bien o servicio en Vecinoo, el
	Usuario acepta que tiene la intenci&#243;n y el derecho de vender el bien
	por &#233;l ofrecido, o est&#225; facultado para ello por su titular y lo
	tiene disponible para su entrega inmediata o para el plazo especificado en
	la publicaci&#243;n. Se establece que los precios de los productos
	publicados deber&#225;n ser expresados con IVA incluido cuando corresponda
	la aplicaci&#243;n del mismo, y en moneda del curso legal. Vecinoo
	podr&#225; remover cualquier publicaci&#243;n cuyo precio no sea expresado
	de esta forma para evitar confusiones o malos entendidos en cuanto al
	precio final del producto. Se deja expresamente establecido que ninguna
	descripci&#243;n podr&#225; contener datos personales o de contacto, tales
	como, y sin limitarse a, n&#250;meros telef&#243;nicos, direcci&#243;n de
	e-mail, direcci&#243;n postal, direcciones de p&#225;ginas de Internet que
	contengan datos como los mencionados anteriormente, salvo lo estipulado
	espec&#237;ficamente para las categor&#237;as: Carros, motos y otros,
	Inmuebles y Servicios. No podr&#225; publicitarse otros medios de pagos,
	distintos de los enunciados por Vecinoo en la p&#225;gina de
	publicaci&#243;n de art&#237;culos. En caso que se infrinja cualquiera de
	las disposiciones establecidas en esta cl&#225;usula, Vecinoo podr&#225;
	editar el espacio, solicitar al Usuario que lo edite, o dar de baja la
	publicaci&#243;n donde se encuentre la infracci&#243;n.
</p>
<ol>
	<li>
		Inclusi&#243;n de im&#225;genes y fotograf&#237;as
	</li>
</ol>
<p>
	Desde la creaci&#243;n de la publicaci&#243;n, el usuario autoriza a
	Vecinoo y sus compa&#241;&#237;as asociadas a utilizar, publicar,
	reproducir y/o adaptar las im&#225;genes y fotograf&#237;as incluidas en
	sus publicaciones.
</p>
<p>
	En particular, el usuario otorga a Vecinoo y a sus sociedades relacionadas
	una autorizaci&#243;n gratuita, irrevocable, no exclusiva, internacional y
	sin l&#237;mite temporal para publicar, reproducir y/o adaptar las
	im&#225;genes y fotograf&#237;as con el fin de ser usadas en todos los
	sitios y aplicaciones de Vecinoo, redes sociales y/o en cualquier medio
	masivo y no masivo de comunicaci&#243;n, incluyendo sin limitaci&#243;n,
	plataformas y cualquier otro medio digital o f&#237;sico que Vecinoo
	considere oportuno o con aquellas otras plataformas o sitios de Internet
	con los cuales Vecinoo haya realizado una alianza, para identificar
	ofertas, clasificar productos, crear cat&#225;logos, realizar acciones
	publicitarias y de marketing y sublicenciar el uso a terceros para estos
	fines.
</p>
<p>
	El usuario declara y garantiza que es titular o licenciatario de los
	derechos necesarios sobre las im&#225;genes y fotograf&#237;as contenidas
	en sus publicaciones y cuenta con los derechos y facultades necesarias para
	conceder la autorizaci&#243;n detallada en esta cl&#225;usula, siendo
	responsable exclusivo por cualquier infracci&#243;n a derechos de terceros.
</p>
<p>
	Vecinoo podr&#225; eliminar la publicaci&#243;n de las im&#225;genes y
	fotograf&#237;as, e incluso del bien o servicio, si interpretara, a su
	exclusivo criterio, que la imagen no cumple con los presentes T&#233;rminos
	y Condiciones.
</p>
<ol>
	<li>
		Productos prohibidos
	</li>
</ol>
<p>
	S&#243;lo podr&#225;n ser ingresados en las listas de bienes y/o servicios
	ofrecidos, aquellos cuya venta no se encuentre t&#225;cita o expresamente
	prohibida en los T&#233;rminos y Condiciones Generales y dem&#225;s
	pol&#237;ticas de Vecinoo o por la ley vigente. Para obtener mayor
	informaci&#243;n sobre art&#237;culos o servicios prohibidos, se pueden
	consultar nuestras Pol&#237;ticas de Art&#237;culos Prohibidos de Vecinoo.
</p>
<ol>
	<li>
		privacidad de la Informaci&#243;n
	</li>
</ol>
<p>
	Para utilizar los Servicios ofrecidos por Vecinoo, los Usuarios
	deber&#225;n facilitar determinados datos de car&#225;cter personal. Su
	informaci&#243;n personal se procesa y almacena en servidores o medios
	magn&#233;ticos que mantienen altos est&#225;ndares de seguridad y
	protecci&#243;n tanto f&#237;sica como tecnol&#243;gica. Para mayor
	informaci&#243;n sobre la privacidad de los Datos Personales y casos en los
	que ser&#225; revelada la informaci&#243;n personal, se pueden consultar
	nuestras Pol&#237;ticas de Privacidad
</p>
<ol>
	<li>
		Obligaciones de los Usuarios
	</li>
</ol>
<ol>
	<li>
		Obligaciones del Comprador
	</li>
</ol>
<p>
	Durante el plazo fijado por el Usuario Vendedor, los Usuarios interesados
	realizar&#225;n ofertas de compra para los bienes y ofertas de
	contrataci&#243;n para los servicios. La oferta de venta concluye una vez
	que vence el plazo de la publicaci&#243;n del producto o se acaban las
	cantidades estipuladas por el Vendedor.
</p>
<p>
	El Comprador est&#225; obligado a intentar comunicarse con el vendedor y
	completar la operaci&#243;n si ha realizado una oferta por un art&#237;culo
	publicado, salvo que la operaci&#243;n est&#233; prohibida por la ley o los
	T&#233;rminos y Condiciones Generales y dem&#225;s pol&#237;ticas de
	Vecinoo, en cuyo caso no estar&#225; obligado a concretar la
	operaci&#243;n.
</p>
<p>
	Al ofertar por un art&#237;culo el Usuario acepta quedar obligado por las
	condiciones de venta incluidas en la descripci&#243;n del art&#237;culo en
	la medida en que las mismas no infrinjan las leyes o los T&#233;rminos y
	Condiciones Generales y dem&#225;s pol&#237;ticas de Vecinoo. La oferta de
	compra es irrevocable salvo en circunstancias excepcionales, tales como que
	el vendedor cambie sustancialmente la descripci&#243;n del art&#237;culo
	despu&#233;s de realizada alguna oferta, que exista un claro error
	tipogr&#225;fico, o que no pueda verificar la identidad del vendedor.
</p>
<p>
	Las ofertas de compra s&#243;lo ser&#225;n consideradas v&#225;lidas, una
	vez que hayan sido procesadas por el sistema inform&#225;tico de Vecinoo.
</p>
<p>
	<strong>Impuestos.</strong>
	Tal como lo establece la normativa fiscal vigente, el comprador debe exigir
	factura o ticket al vendedor como comprobante de la operaci&#243;n. El
	vendedor no estar&#225; obligado a emitir factura o ticket s&#243;lo en el
	caso de tratarse de una persona f&#237;sica que efect&#250;a ventas
	ocasionalmente.
</p>
<ol>
	<li>
		Obligaciones del Vendedor
	</li>
</ol>
<p>
	El Usuario Vendedor debe tener capacidad legal para vender el bien objeto
	de su oferta. Asimismo, debe cumplir con todas las obligaciones
	regulatorias pertinentes y contar con los registros, habilitaciones,
	permisos y/o autorizaciones exigidos por la normativa aplicable para la
	venta de los bienes y servicios ofrecidos. Si el Usuario Vendedor ha
	recibido una oferta sobre el precio que estableci&#243; en la
	publicaci&#243;n, queda obligado a intentar comunicarse con el comprador y
	completar la operaci&#243;n con el Usuario que ofert&#243;. La
	cancelaci&#243;n de una venta por parte del Usuario vendedor impactar&#225;
	en su reputaci&#243;n. Aquel Usuario vendedor que tenga un porcentaje de
	ventas canceladas igual o superior a 2,5%, podr&#225; ser advertido,
	suspendido y/o inhabilitado por Vecinoo para continuar operando en el
	sitio.
</p>
<p>
	Dado que Vecinoo es un punto de encuentro entre comprador y vendedor y no
	participa de las operaciones que se realizan entre ellos, el Vendedor
	ser&#225; responsable por todas las obligaciones y cargas impositivas que
	correspondan por la venta de sus art&#237;culos, sin que pudiera
	imput&#225;rsele a Vecinoo alg&#250;n tipo de responsabilidad por
	incumplimientos en tal sentido.
</p>
<p>
	<strong>Impuestos</strong>
	. Como se menciona anteriormente, Vecinoo s&#243;lo pone a disposici&#243;n
	de los Usuarios un espacio virtual que les permite comunicarse mediante
	Internet para encontrar una forma de vender o comprar art&#237;culos y/o
	servicios. Vecinoo no tiene participaci&#243;n alguna en el proceso de
	negociaci&#243;n y perfeccionamiento del contrato definitivo entre las
	partes. Por eso, Vecinoo no es responsable por el efectivo cumplimiento de
	las obligaciones fiscales o impositivas establecidas por la ley vigente.
</p>
<ol>
	<li>
		Violaciones del Sistema o Bases de Datos
	</li>
</ol>
<p>
	No est&#225; permitida ninguna acci&#243;n o uso de dispositivo, software,
	u otro medio tendiente a interferir tanto en las actividades y operatoria
	de Vecinoo como en las ofertas, descripciones, cuentas o bases de datos de
	Vecinoo. Cualquier intromisi&#243;n, tentativa o actividad violatoria o
	contraria a las leyes sobre derecho de propiedad intelectual y/o a las
	prohibiciones estipuladas en este contrato har&#225;n pasible a su
	responsable de las acciones legales pertinentes, y a las sanciones
	previstas por este acuerdo, as&#237; como lo har&#225; responsable de
	indemnizar los da&#241;os ocasionados.
</p>
<ol>
	<li>
		Sanciones. Suspensi&#243;n de operaciones
	</li>
</ol>
<p>
	Sin perjuicio de otras medidas, Vecinoo podr&#225; advertir, suspender en
	forma temporal o inhabilitar definitivamente la Cuenta de un Usuario o una
	publicaci&#243;n, aplicar una sanci&#243;n que impacte negativamente en la
	reputaci&#243;n de un Usuario, iniciar las acciones que estime pertinentes
	y/o suspender la prestaci&#243;n de sus Servicios si (a) se quebrantara
	alguna ley, o cualquiera de las estipulaciones de los T&#233;rminos y
	Condiciones Generales y dem&#225;s pol&#237;ticas de Vecinoo; (b) si
	incumpliera sus compromisos como Usuario; (c) si se incurriera a criterio
	de Vecinoo en conductas o actos dolosos o fraudulentos; (d) no pudiera
	verificarse la identidad del Usuario o cualquier informaci&#243;n
	proporcionada por el mismo fuere err&#243;nea; (e) Vecinoo entendiera que
	las publicaciones u otras acciones pueden ser causa de responsabilidad para
	el Usuario que las public&#243;, para Vecinoo o para los Usuarios. En
	el caso de la suspensi&#243;n o inhabilitaci&#243;n de un Usuario, todos
	los art&#237;culos que tuviera publicados ser&#225;n removidos del sistema.
	Tambi&#233;n se remover&#225;n del sistema las ofertas de compra de bienes
	ofrecidos en subasta.
</p>
<ol>
	<li>
		Responsabilidad
	</li>
</ol>
<p>
	Vecinoo s&#243;lo pone a disposici&#243;n de los Usuarios un espacio
	virtual que les permite ponerse en comunicaci&#243;n mediante Internet para
	encontrar una forma de vender o comprar servicios o bienes.
</p>
<p>
	Vecinoo no es el propietario de los art&#237;culos ofrecidos, no tiene
	posesi&#243;n de ellos ni los ofrece en venta.
</p>
<p>
	Vecinoo no interviene en el perfeccionamiento de las operaciones realizadas
	entre los Usuarios ni en las condiciones por ellos estipuladas para las
	mismas, por ello no ser&#225; responsable respecto de la existencia,
	calidad, cantidad, estado, integridad o legitimidad de los bienes
	ofrecidos, adquiridos o enajenados por los Usuarios, as&#237; como de la
	capacidad para contratar de los Usuarios o de la veracidad de los Datos
	Personales por ellos ingresados. Cada Usuario conoce y acepta ser el
	exclusivo responsable por los art&#237;culos que publica para su venta y
	por las ofertas y/o compras que realiza.
</p>
<p>
	Debido a que Vecinoo no tiene ninguna participaci&#243;n durante todo el
	tiempo en que el art&#237;culo se publica para la venta, ni en la posterior
	negociaci&#243;n y perfeccionamiento del contrato definitivo entre las
	partes, no ser&#225; responsable por el efectivo cumplimiento de las
	obligaciones asumidas por los Usuarios en el perfeccionamiento de la
	operaci&#243;n. El Usuario conoce y acepta que al realizar operaciones con
	otros Usuarios o terceros lo hace bajo su propio riesgo. En ning&#250;n
	caso Vecinoo ser&#225; responsable por lucro cesante, o por cualquier otro
	da&#241;o y/o perjuicio que haya podido sufrir el Usuario, debido a las
	operaciones realizadas o no realizadas por art&#237;culos publicados a
	trav&#233;s de Vecinoo.
</p>
<p>
	Vecinoo recomienda actuar con prudencia y sentido com&#250;n al momento de
	realizar operaciones con otros Usuarios. El Usuario debe tener presentes,
	adem&#225;s, los riesgos de contratar con menores o con personas que se
	valgan de una identidad falsa. Vecinoo NO ser&#225; responsable por la
	realizaci&#243;n de ofertas y/o operaciones con otros Usuarios basadas en
	la confianza depositada en el sistema o los Servicios brindados por Vecinoo
</p>
<p>
	En caso que uno o m&#225;s Usuarios o alg&#250;n tercero inicien cualquier
	tipo de reclamo o acciones legales contra otro u otros Usuarios, todos y
	cada uno de los Usuarios involucrados en dichos reclamos o acciones eximen
	de toda responsabilidad a Vecinoo y a sus directores, gerentes, empleados,
	agentes, operarios, representantes y apoderados. Los Usuarios tienen un
	plazo de 60 d&#237;as desde la compra para iniciar un reclamo contra otro u
	otros Usuarios. Una vez vencido este plazo, no podr&#225;n iniciar un
	reclamo desde el sitio de Vecinoo.
</p>
<ol>
	<li>
		10.Alcance de los servicios de Vecinoo
	</li>
</ol>
<p>
	Este acuerdo no crea ning&#250;n contrato de sociedad, de mandato, de
	franquicia, o relaci&#243;n laboral entre Vecinoo y el Usuario. El Usuario
	reconoce y acepta que Vecinoo no es parte en ninguna operaci&#243;n, ni
	tiene control alguno sobre la calidad, seguridad o legalidad de los
	art&#237;culos anunciados, la veracidad o exactitud de los anuncios, la
	capacidad de los Usuarios para vender o comprar art&#237;culos. Vecinoo no
	puede asegurar que un Usuario completar&#225; una operaci&#243;n ni
	podr&#225; verificar la identidad o Datos Personales ingresados por los
	Usuarios. Vecinoo no garantiza la veracidad de la publicidad de terceros
	que aparezca en el sitio y no ser&#225; responsable por la correspondencia
	o contratos que el Usuario celebre con dichos terceros o con otros
	Usuarios.
</p>
<ol>
	<li>
		11.Fallas en el sistema
	</li>
</ol>
<p>
	Vecinoo no se responsabiliza por cualquier da&#241;o, perjuicio o
	p&#233;rdida al Usuario causados por fallas en el sistema, en el servidor o
	en Internet. Vecinoo tampoco ser&#225; responsable por cualquier virus que
	pudiera infectar el equipo del Usuario como consecuencia del acceso, uso o
	examen de su sitio web o a ra&#237;z de cualquier transferencia de datos,
	archivos, im&#225;genes, textos, o audio contenidos en el mismo. Los
	Usuarios NO podr&#225;n imputarle responsabilidad alguna ni exigir pago por
	lucro cesante, en virtud de perjuicios resultantes de dificultades
	t&#233;cnicas o fallas en los sistemas o en Internet. Vecinoo no garantiza
	el acceso y uso continuado o ininterrumpido de su sitio. El sistema puede
	eventualmente no estar disponible debido a dificultades t&#233;cnicas o
	fallas de Internet, o por cualquier otra circunstancia ajena a Vecinoo; en
	tales casos se procurar&#225; restablecerlo con la mayor celeridad posible
	sin que por ello pueda imput&#225;rsele alg&#250;n tipo de responsabilidad.
	Vecinoo no ser&#225; responsable por ning&#250;n error u omisi&#243;n
	contenidos en su sitio web.
</p>
<ol>
	<li>
		12.Tarifas. Facturaci&#243;n
	</li>
</ol>
<p>
	La inscripci&#243;n en Vecinoo es gratuita.
</p>
<p>
	Vecinoo se reserva el derecho de modificar, cambiar, agregar, o eliminar
	las tarifas vigentes, en cualquier momento, lo cual ser&#225; notificado a
	los Usuarios, en la forma establecida en la Cl&#225;usula 3. Sin embargo,
	Vecinoo podr&#225; modificar temporalmente la Pol&#237;tica de Tarifas y
	las tarifas por sus servicios por raz&#243;n de promociones, siendo
	efectivas estas modificaciones cuando se haga p&#250;blica la
	promoci&#243;n o se realice el anuncio.
</p>
<p>
	Envi&#243;: Ser&#225;n asumidos por el usuario comprador y/o vendedor sea
	acordado por los mismos
</p>
<ol>
	<li>
		13.Propiedad intelectual - Licencias - Enlaces
	</li>
</ol>
<p>
	Vecinoo y/o sus sociedades controlantes, controladas, filiales o
	subsidiarias se reservan todos los derechos, incluyendo los derechos de
	propiedad intelectual e industrial, asociados con los servicios de Vecinoo
  , sus sitios web, los contenidos de sus pantallas, programas, bases de
	datos, redes, c&#243;digos, desarrollo, software, arquitectura, hardware,
	contenidos, informaci&#243;n, tecnolog&#237;a, fases de integraci&#243;n,
	funcionalidades, dominios, archivos que permiten al Usuario acceder y crear
	su Cuenta, herramientas de venta, marcas, patentes, derechos de autor,
	dise&#241;os y modelos industriales, nombres comerciales, entre otros, y
	declara que est&#225;n protegidos por leyes nacionales e internacionales
	vigentes.
</p>
<p>
	En ning&#250;n caso se entender&#225; que el Usuario tendr&#225; alg&#250;n
	tipo de derecho sobre los mismos excepto para utilizar el servicio de
	Vecinoo conforme a lo previsto en estos T&#233;rminos y Condiciones
	Generales. El uso indebido o contrario a la normativa vigente de los
	derechos de propiedad intelectual e industrial de Vecinoo, as&#237;
	como su reproducci&#243;n total o parcial, queda prohibido, salvo
	autorizaci&#243;n expresa y por escrito de Vecinoo.
</p>
<p>
	Los Usuarios tampoco podr&#225;n comunicar que los productos o servicios
	que ofrecen son patrocinados, promovidos, producidos, ofrecidos y/o
	vendidos por Vecinoo y deber&#225;n abstenerse de realizar cualquier acto
	que pudiera causar un da&#241;o, p&#233;rdida de reputaci&#243;n, o
	disminuci&#243;n del valor de los derechos de propiedad intelectual e
	industrial de Vecinoo
</p>
<p>
	El sitio puede contener enlaces a sitios web de terceros. En virtud que
	Vecinoo no tiene control sobre tales sitios, no ser&#225; responsable por
	los contenidos, materiales, acciones y/o servicios prestados por los
	mismos, ni por da&#241;os o p&#233;rdidas ocasionadas por la
	utilizaci&#243;n de &#233;stos, causados directa o indirectamente. La
	presencia de enlaces a otros sitios web no implica una sociedad,
	relaci&#243;n, aprobaci&#243;n, respaldo de Vecinoo con dichos sitios y sus
	contenidos.
</p>
<p>
	Anexos
</p>
<p>
	Forman parte integral e inseparable de los T&#233;rminos y Condiciones
	Generales, los siguientes documentos, donde se detallan pol&#237;ticas y/o
	T&#233;rminos y Condiciones de diferentes servicios ofrecidos en el sitio.
	Los mismos se podr&#225;n consultar dentro del sitio mediante el enlace
	abajo provisto o accediendo directamente a las p&#225;ginas
	correspondientes:
</p>
<ol>
	<li>
		Pol&#237;tica de Privacidad
	</li>
	<li>
		Pol&#237;tica de Productos Prohividos
	</li>
</ol>
<p>
	Jurisdicci&#243;n apl&#237;cale
</p>
<p>
	Este acuerdo estar&#225; regido en todos sus puntos por las leyes vigentes
	en la Rep&#250;blica de Colombia.
</p>
<p>
	Cualquier controversia derivada del presente acuerdo, su existencia,
	validez, interpretaci&#243;n, alcance o cumplimiento, ser&#225; sometida a
	las leyes aplicables y a los Tribunales competentes de la Ciudad de
	Bogot&#225; y los procedimientos se llevar&#225;n a cabo en idioma
	castellano.
</p>
<p>
	Domicilio
</p>
<p>
	Pol&#237;tica de Privacidad
</p>
<p>
	La presente Pol&#237;tica de Privacidad establece los t&#233;rminos en que
	Vecinoo usa y protege la informaci&#243;n que es proporcionada por sus
	usuarios al momento de utilizar su sitio web. Esta compa&#241;&#237;a
	est&#225; comprometida con la seguridad de los datos de sus usuarios.
	Cuando le pedimos llenar los campos de informaci&#243;n personal con la
	cual usted pueda ser identificado, lo hacemos asegurando que s&#243;lo se
	emplear&#225; de acuerdo con los t&#233;rminos de este documento. Sin
	embargo esta Pol&#237;tica de Privacidad puede cambiar con el tiempo o ser
	actualizada por lo que le recomendamos y enfatizamos revisar continuamente
	esta p&#225;gina para asegurarse que est&#225; de acuerdo con dichos
	cambios.
</p>
<p>
	Informaci&#243;n que es recogida
</p>
<p>
	Nuestro sitio web podr&#225; recoger informaci&#243;n personal por ejemplo:
	Nombre, informaci&#243;n de contacto como su direcci&#243;n de correo
	electr&#243;nica e informaci&#243;n demogr&#225;fica. As&#237; mismo cuando
	sea necesario podr&#225; ser requerida informaci&#243;n espec&#237;fica
	para procesar alg&#250;n pedido o realizar una entrega o facturaci&#243;n.
</p>
<p>
	Uso de la informaci&#243;n recogida
</p>
<p>
	Nuestro sitio web emplea la informaci&#243;n con el fin de proporcionar el
	mejor servicio posible, particularmente para mantener un registro de
	usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y
	servicios. Es posible que sean enviados correos electr&#243;nicos
	peri&#243;dicamente a trav&#233;s de nuestro sitio con ofertas especiales,
	nuevos productos y otra informaci&#243;n publicitaria que consideremos
	relevante para usted o que pueda brindarle alg&#250;n beneficio, estos
	correos electr&#243;nicos ser&#225;n enviados a la direcci&#243;n que usted
	proporcione y podr&#225;n ser cancelados en cualquier momento.
</p>
<p>
	Vecinoo est&#225; altamente comprometido para cumplir con el compromiso de
	mantener su informaci&#243;n segura. Usamos los sistemas m&#225;s avanzados
	y los actualizamos constantemente para asegurarnos que no exista
	ning&#250;n acceso no autorizado.
</p>
<p>
	Cookies
</p>
<p>
	Una cookie se refiere a un fichero que es enviado con la finalidad de
	solicitar permiso para almacenarse en su ordenador, al aceptar dicho
	fichero se crea y la cookie sirve entonces para tener informaci&#243;n
	respecto al tr&#225;fico web, y tambi&#233;n facilita las futuras visitas a
	una web recurrente. Otra funci&#243;n que tienen las cookies es que con
	ellas las web pueden reconocerte individualmente y por tanto brindarte el
	mejor servicio personalizado de su web.
</p>
<p>
	Nuestro sitio web emplea las cookies para poder identificar las
	p&#225;ginas que son visitadas y su frecuencia. Esta informaci&#243;n es
	empleada &#250;nicamente para an&#225;lisis estad&#237;stico y despu&#233;s
	la informaci&#243;n se elimina de forma permanente. Usted puede eliminar
	las cookies en cualquier momento desde su ordenador. Sin embargo las
	cookies ayudan a proporcionar un mejor servicio de los sitios web,
	est&#225;s no dan acceso a informaci&#243;n de su ordenador ni de usted, a
	menos de que usted as&#237; lo quiera y la proporcione directamente,
	visitas a una web . Usted puede aceptar o negar el uso de cookies, sin
	embargo la mayor&#237;a de navegadores aceptan cookies autom&#225;ticamente
	pues sirve para tener un mejor servicio web. Tambi&#233;n usted puede
	cambiar la configuraci&#243;n de su ordenador para declinar las cookies. Si
	se declinan es posible que no pueda utilizar algunos de nuestros servicios.
</p>
<p>
	Enlaces a Terceros
</p>
<p>
	Este sitio web pudiera contener en laces a otros sitios que pudieran ser de
	su inter&#233;s. Una vez que usted de clic en estos enlaces y abandone
	nuestra p&#225;gina, ya no tenemos control sobre al sitio al que es
	redirigido y por lo tanto no somos responsables de los t&#233;rminos o
	privacidad ni de la protecci&#243;n de sus datos en esos otros sitios
	terceros. Dichos sitios est&#225;n sujetos a sus propias pol&#237;ticas de
	privacidad por lo cual es recomendable que los consulte para confirmar que
	usted est&#225; de acuerdo con estas.
</p>
<p>
	Control de su informaci&#243;n personal
</p>
<p>
	En cualquier momento usted puede restringir la recopilaci&#243;n o el uso
	de la informaci&#243;n personal que es proporcionada a nuestro sitio web.
	Cada vez que se le solicite rellenar un formulario, como el de alta de
	usuario, puede marcar o desmarcar la opci&#243;n de recibir
	informaci&#243;n por correo electr&#243;nico. En caso de que haya marcado
	la opci&#243;n de recibir nuestro bolet&#237;n o publicidad usted puede
	cancelarla en cualquier momento.
</p>
<p>
	Esta compa&#241;&#237;a no vender&#225;, ceder&#225; ni distribuir&#225; la
	informaci&#243;n personal que es recopilada sin su consentimiento, salvo
	que sea requerido por un juez con un orden judicial.
</p>
<p>
	Vecinoo Se reserva el derecho de cambiar los t&#233;rminos de la presente
	Pol&#237;tica de Privacidad en cualquier momento.
</p>
<p>
	POLITICA DE ART&#205;CULOS PROHIBIDOS
</p>
<ol>
	<li>
		Alcohol, tabaco, drogas, parafernalia de drogas y medicamentos
	</li>
</ol>
<p>
	En Vecinoo est&#225;n prohibidos el alcohol y las drogas o medicamentos.
	Estas sustancias est&#225;n sujetas a serias restricciones legales y, en
	muchos casos, se consideran sustancias controladas conforme a la
	legislaci&#243;n aplicable. Nuestra pol&#237;tica se aplica tambi&#233;n a
	otras sustancias que tengan o a las que se atribuya un efecto
	estupefaciente o sanador. Dejando a un lado las posibles restricciones
	legales, estas sustancias sencillamente no se ajustan a la filosof&#237;a
	de Vecinoo y, por lo tanto, no est&#225;n permitidas.
</p>
<p>
	A continuaci&#243;n se ofrecen algunos ejemplos de art&#237;culos que no
	pueden venderse en Vecinoo:
</p>
<ol>
	<li>
		Alcohol.
	</li>
	<li>
		Productos de tabaco, productos que se puedan fumar, cigarrillos
		electr&#243;nicos y l&#237;quido para cigarrillos electr&#243;nicos.
	</li>
	<li>
		Drogas y ciertas sustancias herbales t&#243;xicas, incluidas las
		utilizadas con fines recreativos o medicinales, con independencia de
		que sean legales o no.
	</li>
	<li>
		Parafernalia de drogas, incluidos, por ejemplo, los art&#237;culos con
		carburador; tubos o art&#237;culos con tubos; bongs y pipas tipo
		bubbler; vaporizadores y sus componentes.
	</li>
	<li>
		Medicamentos y f&#225;rmacos.
	</li>
</ol>
<p>
	Restricciones sobre descripciones de supuestos beneficios para la salud:
</p>
<p>
	Se entiende por atribuci&#243;n de propiedades m&#233;dicas cualquier
	elemento de un anuncio o una tienda que atribuya una relaci&#243;n causal
	entre un art&#237;culo y la prevenci&#243;n, curaci&#243;n o tratamiento de
	una enfermedad o afecci&#243;n m&#233;dica. Las atribuciones de propiedades
	m&#233;dicas podr&#237;an estar sujetas a distintos grados de
	regulaci&#243;n. Si haces afirmaciones sobre los supuestos beneficios para
	la salud de un art&#237;culo que vendes en Vecinoo, te recomendamos que
	consultes a un experto cualificado sobre qu&#233; regulaciones se aplican
	en tu caso. Es tu responsabilidad conocer y cumplir todas las leyes y
	regulaciones que se apliquen a los art&#237;culos que vendes.
</p>
<p>
	En Vecinoo prohibimos determinadas atribuciones de propiedades m&#233;dicas
	bas&#225;ndonos en nuestros valores, tales como afirmaciones enga&#241;osas
	o que supongan un riesgo no razonable para nuestra comunidad. Tambi&#233;n
	podremos eliminar afirmaciones que consideremos inadecuadas, excesivas o no
	aptas de cualquier otro modo para nuestro mercado. Si recibimos un aviso de
	una autoridad legal, podremos eliminar un art&#237;culo.
</p>
<p>
	2. Productos animales y restos humanos
</p>
<p>
	Algunos productos animales est&#225;n altamente regulados y, por su riesgo
	de entra&#241;ar da&#241;os para los animales vivos, de compa&#241;&#237;a
	o especies amenazadas, no se ajustan a la filosof&#237;a de Vecinoo.
</p>
<p>
	M&#225;s informaci&#243;n:
</p>
<p>
	A continuaci&#243;n te ofrecemos algunos ejemplos de productos animales que
	no pueden venderse en Vecinoo:
</p>
<ol>
	<li>
		Animales vivos.
	</li>
	<li>
		Art&#237;culos creados con cualquier especie animal catalogada por la
		Ley de especies en peligro de extinci&#243;n o amenazada.
	</li>
	<li>
		Art&#237;culos elaborados con partes, o pieles, de perros y gatos.
	</li>
	<li>
		El marfil o los huesos de animales productores de marfil, como
		colmillos, marfil de alce, marfil fosilizado y marfil de mamut lanudo.
	</li>
	<li>
		Art&#237;culos fabricados a partir de restos humanos.
	</li>
</ol>
<p>
	3. Art&#237;culos peligrosos: sustancias peligrosas, art&#237;culos
	retirados y armas
</p>
<p>
	Por motivos de seguridad, y debido a la compleja legislaci&#243;n que se
	aplica a determinados art&#237;culos, pedimos a nuestros miembros que se
	abstengan de vender art&#237;culos que pudieran considerarse peligrosos.
</p>
<p>
	M&#225;s informaci&#243;n:
</p>
<ol>
	<li>
		Sustancias peligrosas
	</li>
	<li>
		Debido al da&#241;o potencial que entra&#241;an las sustancias
		peligrosas, as&#237; como a la compleja legislaci&#243;n que se aplica
		a dichas sustancias (incluidas restricciones de env&#237;o), las
		sustancias peligrosas est&#225;n prohibidas en Vecinoo.
	</li>
	<li>
		Si bien la lista no es exhaustiva, a continuaci&#243;n te ofrecemos
		algunos ejemplos de sustancias peligrosas prohibidas:
	</li>
	<li>
		Explosivos (fuegos artificiales, petardos o bengalas)
	</li>
	<li>
		Art&#237;culos inflamables
	</li>
	<li>
		Gases
	</li>
	<li>
		Material radiactivo
	</li>
	<li>
		Sustancias t&#243;xicas (por ejemplo, venenos)
	</li>
	<li>
		Art&#237;culos retirados o art&#237;culos que presentan un riesgo no
		razonable de provocar da&#241;os
	</li>
	<li>
		Est&#225; prohibido vender en Vecinoo todos aquellos art&#237;culos que
		hayan sido retirados del mercado por el gobierno o por los fabricantes.
	</li>
	<li>
		Est&#225;n prohibidos los art&#237;culos que presentan un riesgo no
		razonable de provocar da&#241;os, incluso cuando no hayan sido objeto
		de retirada. Esto incluir&#237;a, por ejemplo, los art&#237;culos que
		suponen riesgo de asfixia o atragantamiento. Generalmente, utilizamos
		la informaci&#243;n de diversas agencias gubernamentales para
		identificar estos art&#237;culos.
	</li>
	<li>
		Armas
	</li>
</ol>
<p>
	A la hora de definir qu&#233; puede considerarse o no un arma, el contexto
	es muy importante. En caso de duda, lo m&#225;s seguro es presuponer que no
	permitiremos ninguna herramienta o instrumento que pretenda utilizarse como
	arma para infligir da&#241;o a una persona. Por lo general, los siguientes
	art&#237;culos no est&#225;n permitidos en Vecinoo:
</p>
<ol>
	<li>
		Pistolas, navajas y otras armas obvias, aunque sean antiguas
	</li>
	<li>
		Armas de imitaci&#243;n que parezcan reales o que est&#233;n prohibidas
	</li>
</ol>
<p>
	Ejemplos de art&#237;culos permitidos:
</p>
<ol>
	<li>
		Cuchillos de cocina u otros cuchillos que se utilicen como herramientas
	</li>
</ol>
<p>
	4. Art&#237;culos de odio: art&#237;culos que promueven, apoyan o ensalzan
	cualquier forma de odio
</p>
<p>
	Queremos que Vecinoo sea una comunidad que acoja a personas de todos los
	entornos, nacionalidades, religiones e ideolog&#237;as pol&#237;ticas,
	as&#237; como de todos los gustos art&#237;sticos y tipos de sentido del
	humor. El arte es incre&#237;blemente subjetivo, y lo que resulta ofensivo
	para unos no lo es necesariamente para otros.
</p>
<p>
	M&#225;s informaci&#243;n:
</p>
<p>
	Vecinoo no permite art&#237;culos o anuncios que promocionen, apoyen o
	ensalcen el odio a las personas, o que, de alguna otra forma, las degraden
	en funci&#243;n de raza, etnia, origen nacional, religi&#243;n, sexo,
	identidad sexual, discapacidad u orientaci&#243;n sexual, o art&#237;culos
	o contenido que promocionen organizaciones o personas que compartan los
	citados puntos de vista.
</p>
<p>
	Los siguientes art&#237;culos no est&#225;n permitidos en Vecinoo:
</p>
<ol>
	<li>
		Art&#237;culos que apoyan o ensalzan a grupos de odio actuales o
		hist&#243;ricos, incluidos art&#237;culos de propaganda o de
		colecci&#243;n.
	</li>
	<li>
		Art&#237;culos que contengan insultos racistas o t&#233;rminos
		despectivos.
	</li>
</ol>
<p>
	Ejemplos de art&#237;culos permitidos:
</p>
<ol>
	<li>
		Tendemos a permitir art&#237;culos con un valor educativo,
		hist&#243;rico o art&#237;stico, si bien sabemos que incluso dichos
		art&#237;culos son susceptibles de una serie de interpretaciones
		v&#225;lidas, a veces contradictorias. Desde el reconocimiento de que
		podr&#237;a no existir consenso en cuanto a su valor educativo,
		hist&#243;rico o art&#237;stico, solemos permitir los siguientes
		art&#237;culos en Vecinoo:
	</li>
	<li>
		S&#237;mbolos religiosos, incluidas esv&#225;sticas si se utilizan en
		un contexto pac&#237;fico o religioso (a menudo en el hinduismo,
		budismo o jainismo).
	</li>
	<li>
		Art&#237;culos que condenen o hagan burla de figuras hist&#243;ricas
		que tengan un historial de violencia organizada y focalizada contra
		grupos protegidos.
	</li>
</ol>
<p>
	5. Art&#237;culos ilegales, art&#237;culos que promueven actividades
	delictivas y art&#237;culos extremadamente regulados
</p>
<p>
	En Vecinoo cumplimos la ley, y esperamos que nuestros vendedores
	tambi&#233;n lo hagan.
</p>
<p>
	M&#225;s informaci&#243;n:
</p>
<p>
	Los art&#237;culos ilegales y art&#237;culos que promuevan actividades
	ilegales, incluidos art&#237;culos de contrabando o robados, no est&#225;n
	permitidos en Vecinoo. Tampoco lo est&#225;n determinados art&#237;culos
	sujetos a complejas legislaciones o sistemas de registro. Es importante que
	cada vendedor cumpla las leyes de los mercados en los que venda. Todas las
	formas de actividad ilegal est&#225;n estrictamente prohibidas. Asimismo,
	los anuncios no deber&#225;n fomentar ni promover actos ilegales por medio
	de im&#225;genes o descripciones.
</p>
<p>
	Adem&#225;s, debido a complejas restricciones legales, Vecinoo no permite
	la venta de propiedades inmobiliarias o veh&#237;culos de motor (por
	ejemplo, autom&#243;viles, motocicletas, embarcaciones, remolques, etc.).
</p>
<p>
	Exigimos a los vendedores que cumplan todas las leyes que sean de
	aplicaci&#243;n a los art&#237;culos que anuncien. Algunos ejemplos de
	art&#237;culos que podr&#237;an estar sujetos a normativas incluyen las
	plantas y semillas y los productos alimentarios.
</p>
<p>
	6. Pornograf&#237;a y contenido para adultos
</p>
<p>
	Como comunidad creativa, tendemos a ser considerablemente liberales sobre
	lo que permitimos en Vecinoo, pero la pornograf&#237;a no est&#225; dentro
	de nuestros l&#237;mites. Asimismo, restringimos el contenido para adultos
	a fin de que las personas que se ofenden con este tipo de material no
	tengan que verlo. Si vendes contenido para adultos, te rogamos que
	entiendas las distintas sensibilidades que existen en torno a este tema en
	los distintos lugares del mundo y que act&#250;es con respeto.
</p>
<p>
	M&#225;s informaci&#243;n:
</p>
<p>
	En Vecinoo est&#225; prohibida la pornograf&#237;a de cualquier tipo,
	mientras que el contenido para adultos est&#225; restringido.
</p>
<p>
	Si bien puede ser dif&#237;cil definir la pornograf&#237;a, entendemos que
	un art&#237;culo suele clasificarse como pornograf&#237;a cuando es una
	versi&#243;n especialmente extrema o expl&#237;cita de un contenido para
	adultos.
</p>
<p>
	Consideramos contenido para adultos a las im&#225;genes o representaciones
	de genitales masculinos o femeninos, contenido o actividad sexual,
	im&#225;genes violentas, y tipos o representaciones expl&#237;citos de
	taxidermia.
</p>
<p>
	El contenido para adultos debe ser debidamente anunciado y etiquetado como
	tal. No todos los desnudos se consideran contenido para adultos (ver
	ejemplos a continuaci&#243;n). Si tienes dudas sobre si uno de tus
	art&#237;culos es contenido para adultos, lo mejor ser&#225; que
	presupongas que s&#237; lo es y que lo etiquetes como tal.
</p>
<p>
	A la hora de determinar si un contenido para adultos sobrepasa los
	l&#237;mites para considerarse pornograf&#237;a, tenemos en cuenta el
	car&#225;cter realista de la imagen o im&#225;genes representadas y el
	car&#225;cter expl&#237;cito de las representaciones de contenido o
	actividad sexual.
</p>
<p>
	Ejemplos de art&#237;culos permitidos, sin restricciones:
</p>
<ol>
	<li>
		Fotograf&#237;as de desnudos no pornogr&#225;ficos.
	</li>
</ol>
<p>
	Ejemplos de art&#237;culos permitidos, si est&#225;n debidamente marcados
	como Contenido para adultos:
</p>
<ol>
	<li>
		Lenguaje para adultos
	</li>
	<li>
		Art&#237;culos para el bienestar sexual, como consoladores, vibradores,
		y art&#237;culos BDSM
	</li>
</ol>
<p>
	7. Art&#237;culos de violencia: art&#237;culos que promueven, apoyan o
	ensalzan cualquier forma de violencia
</p>
<p>
	Deseamos que Vecinoo sea un lugar seguro para todos. Si bien el contenido
	violento puede ser una parte leg&#237;tima de la historia, de la
	educaci&#243;n o de la expresi&#243;n art&#237;stica, no deber&#225;
	utilizarse nunca para promover o ensalzar actos violentos contra otras
	personas.
</p>
<p>
	M&#225;s informaci&#243;n:
</p>
<p>
	No permitimos los art&#237;culos o anuncios que promuevan, apoyen o
	ensalcen los actos de violencia o de da&#241;o hacia uno mismo o hacia los
	dem&#225;s (incluidas amenazas cre&#237;bles de da&#241;o o violencia hacia
	uno mismo o hacia otros).
</p>
<p>
	Los siguientes art&#237;culos no est&#225;n permitidos en Vecinoo:
</p>
<ol>
	<li>
		Art&#237;culos que ensalcen el sufrimiento o las tragedias humanas,
		incluidos los art&#237;culos en conmemoraci&#243;n u homenaje de
		asesinos en serie
	</li>
	<li>
		Art&#237;culos que intenten explotar desastres naturales o tragedias
		humanas
	</li>
	<li>
		Art&#237;culos que fomenten, ensalcen o celebren actos de violencia
		contra individuos o grupos
	</li>
	<li>
		Art&#237;culos que promuevan la automutilaci&#243;n, la inanici&#243;n
		u otros tipos de autogestiones
	</li>
</ol>
<p>
	Ejemplos de art&#237;culos permitidos:
</p>
<ol>
	<li>
		Obras de arte o literarias de ficci&#243;n (zombis, vampiros y otras
		obras de ficci&#243;n que suelan contener violencia).
	</li>
</ol>
<p>
	8. Conclusi&#243;n
</p>
<p>
	Esperamos que estas directrices te resulten de utilidad, si bien no podemos
	catalogar cada art&#237;culo permitido o prohibido. Nos reservamos el
	derecho a retirar aquellos anuncios que determinemos que no se ajustan a la
	filosof&#237;a de Vecinoo. Dichos anuncios se eliminar&#225;n del sitio,
	pudi&#233;ndose suspender provisional o definitivamente los privilegios del
	miembro que los publique.
</p>
<p>
	Si ves algo en Vecinoo que aparentemente infrinja estas reglas, puedes
	notific&#225;rnoslo. En la parte inferior de cada p&#225;gina de anuncio,
	puedes hacer clic en Informar sobre este art&#237;culo a Vecinoo o en el
	formulario de la secci&#243;n de ayuda.
</p>
                 </IonText>
              
              <IonButton class="ion-float-right"
                onClick={async () => {
                  let pathUrl = ``;
                  if (
                    currentUser.roles.includes(config.RolUserAccess)
                  ) {
                    pathUrl = `${config.UserContext}/${currentUser._id}`;
                  } else if (
                    currentUser.roles.includes(config.RolAdminAccess)
                  ) {
                    pathUrl = `${config.AdminContext}/${currentUser._id}`;
                  } else {
                    pathUrl = `${config.ProviderContext}/${currentUser._id}`;
                  }
                  await HttpRequest(
                    pathUrl,
                    "PATCH",
                    { acceptPolicity: true },
                    true
                  )
                    .then(async (response: any) => {
                      let user = currentUser;
                      user.acceptPolicity = true;
                      const { setObject } = Storages();
					  await setObject("user", user);
					  data(user,false);
                    })
                    .catch((error: any) => {
                      console.error(error);
                      history.go(0);
                    });
                }}
              >
                Aceptar
              </IonButton>
              </IonCardContent>
            </IonCard>
          </IonContent>
          
)}