/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Scusa, c'è stato un errore.")
      .reprompt("Scusa, c'è stato un errore.")
      .getResponse();
  },
};

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = 'Ecco la tua curiosità: ';
const HELP_MESSAGE = 'Come ti posso aiuare? Prova a dire storia italiana';
const HELP_REPROMPT = 'Come posso aiutarti?';
const STOP_MESSAGE = 'Arrivederci!';

const data = [
  "Il nome Italia deriva dal greco italos, che significa vitello. Fu originariamente dato alla regione della Calabria dai coloni greci nell'ottavo secolo e fu esteso a tutta la penisola sotto l'imperatore romano Augusto.",
  "L'Italia è il quinto paese più visitato al mondo, accogliendo ogni anno circa 46 milioni di visitatori stranieri.",
  'Esistono 15 lingue minoritarie ufficialmente riconosciute in Italia, tra cui lingue native come il sardo e il friulano e le lingue dei paesi limitrofi (catalano, occitano, francese, sloveno, croato, albanese e greco).',
  "L'Italia ora ha uno dei tassi di natalità e di fecondità più bassi al mondo.",
  "Due dei paesi più piccoli d'Europa, San Marino e il Vaticano, sono enclave in Italia.",
  "Gli unici tre vulcani attivi in Europa, l'Etna, lo Stromboli e il Vesuvio, sono tutti nel Sud Italia. L'Etna è anche il vulcano più attivo del mondo. È stato in quasi ininterrotta eruzione negli ultimi 3500 anni e ha vomitato lava su base giornaliera dal 1999.",
  "L'Italia non è diventata un paese completamente unificato fino al 1870. Gli italiani hanno mantenuto un forte attaccamento alla loro regione o provincia nativa, e la maggior parte ancora fatica a identificarsi con l'Italia come nazione unica.",
  "L'Italia fu la culla delle civiltà etrusche e poi romane e il centro del primo e più grande impero in Europa e Nord Africa.",
  "La città di Siracusa in Sicilia era una volta la più grande città greca antica del mondo.",
  "La Repubblica di Venezia fu fondata nel 697 e fu sciolta da Napoleone nel 1797, esattamente 1.100 anni dopo. Questo la rende la repubblica più duratura della storia umana, nonché la più lunga e ininterrotta forma di governo che sia mai esistita. In confronto, la Repubblica romana durò poco meno di 500 anni.",
  "La più antica università europea in continua attività è l'Università di Bologna, fondata nel 1088. 13 altre università italiane hanno più di 500 anni.",
  "Le prime banche moderne in Europa sono apparse a Genova nel dodicesimo secolo. Il primo debito pubblico registrato (1150) e il primo contratto di cambio noto (1156) sono entrambi di Genova. La più antica banca del mondo ancora in attività è la Banca Monte dei Paschi di Siena, operativa dal 1472.",
  "Il Rinascimento europeo è iniziato nell'Italia settentrionale nel quattordicesimo secolo.",
  "La Basilica di San Pietro a Roma è il più grande edificio cristiano al mondo. La sua costruzione ha richiesto 120 anni: dal 1506 al 1626.",
  "Il Duomo di Firenze ha la più grande cupola in mattoni mai costruita. Fu progettato da Filippo Brunelleschi nel 1420.",
  "Il Paradiso di Tintoretto nel Palazzo Ducale di Venezia è il più grande dipinto mai realizzato su tela. Misura 22,6 per 9,1 metri (74 piedi per 30 piedi).",
  "Ci sono prove che alcuni tipi di pasta e pizza erano già mangiati nell'antica Roma. Antica pizzeria Port'Alba, la prima vera pizzeria al mondo, fu aperta a Napoli nel 1830.",
  "Gli italiani hanno inventato violino, violino, violoncello e pianoforte e sono stati i più grandi rappresentanti della musica barocca, come Vivaldi, Corelli, Monteverdi, Albinoni.",
  "L'orologio meccanico, il barometro, il termometro, i vetri ottici e il telefono sono tutte invenzioni italiane.",
  "Il festival cinematografico più antico del mondo, a partire dal 1932, è il Festival del cinema di Venezia.",
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
