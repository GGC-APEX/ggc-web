// Shared bot-guard used by /api/newsletter and /api/lead-magnet.
// Layered defence: Origin check, honeypot, timing, email validation,
// disposable-domain blocklist, Gmail/alias normalization, suspicious-name filter.

const ORIGIN_WHITELIST = [
  /^https:\/\/globalgrowth\.consulting$/,
  /^https:\/\/www\.globalgrowth\.consulting$/,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  /^https?:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/
];

// Top disposable / temp-mail domains. Covers the long tail of the most abused providers.
const DISPOSABLE_DOMAINS = new Set([
  '0-mail.com','0815.ru','0clickemail.com','0wnd.net','0wnd.org','10minutemail.com',
  '10minutemail.net','10minutemail.de','10minutemail.co.uk','10minutemail.us','1secmail.com',
  '1secmail.net','1secmail.org','20mail.it','20minutemail.com','2prong.com','30minutemail.com',
  '33mail.com','3d-painting.com','3trtretgfrfe.tk','4warding.com','5ymail.com','675hosting.com',
  '675hosting.net','675hosting.org','7days-printing.com','7tags.com','9ox.net','a-bc.net',
  'afrobacon.com','ajaxapp.net','amilegit.com','amiri.net','amiriindustries.com','anonbox.net',
  'anonymbox.com','antichef.com','antichef.net','antispam.de','antispammail.de','baxomale.ht.cx',
  'beefmilk.com','binkmail.com','bio-muesli.net','bobmail.info','bodhi.lawlita.com','bofthew.com',
  'brefmail.com','bsnow.net','bspamfree.org','bugmenot.com','bumpymail.com','casualdx.com',
  'cek.pm','centermail.com','centermail.net','chammy.info','childsavetrust.org','chogmail.com',
  'choicemail1.com','clipmail.eu','clrmail.com','cool.fr.nf','correo.blogos.net','cosmorph.com',
  'courriel.fr.nf','courrieltemporaire.com','curryworld.de','cust.in','dacoolest.com','dandikmail.com',
  'dayrep.com','deadaddress.com','deagot.com','dealja.com','delikkt.de','despam.it',
  'despammed.com','devnullmail.com','dfgh.net','digitalsanctuary.com','dingbone.com','disposableaddress.com',
  'disposableemailaddresses.com','disposableinbox.com','dispose.it','dispostable.com','dodgeit.com',
  'dodgit.com','dodgit.org','donemail.ru','dontreg.com','dontsendmespam.de','drdrb.net',
  'dump-email.info','dumpandjunk.com','dumpmail.de','dumpyemail.com','e-mail.com','e-mail.org',
  'e4ward.com','easytrashmail.com','einrot.com','einrot.de','eintagsmail.de','email60.com',
  'emailgo.de','emailias.com','emaillime.com','emailmiser.com','emailsensei.com','emailtemporanea.com',
  'emailtemporanea.net','emailtemporario.com.br','emailthe.net','emailtmp.com','emailwarden.com',
  'emailx.at.hm','emailxfer.com','emeil.in','emeil.ir','emkei.cz','enterto.com',
  'ephemail.net','etranquil.com','etranquil.net','etranquil.org','evopo.com','explodemail.com',
  'express.net.ua','eyepaste.com','fakeinbox.com','fakeinformation.com','fansworldwide.de','fantasymail.de',
  'fastacura.com','fastchevy.com','fastchrysler.com','fastkawasaki.com','fastmazda.com','fastmitsubishi.com',
  'fastnissan.com','fastsubaru.com','fastsuzuki.com','fasttoyota.com','fastyamaha.com','filzmail.com',
  'fixmail.tk','fizmail.com','fleckens.hu','frapmail.com','friendlymail.co.uk','front14.org',
  'fux0ringduh.com','garliclife.com','gehensiemirnichtaufdensack.de','get1mail.com','get2mail.fr','getairmail.com',
  'getonemail.com','getonemail.net','ghosttexter.de','girlsundertheinfluence.com','gishpuppy.com','gowikibooks.com',
  'grr.la','guerillamail.com','guerillamail.net','guerrillamail.biz','guerrillamail.com','guerrillamail.de',
  'guerrillamail.info','guerrillamail.net','guerrillamail.org','guerrillamailblock.com','h.mintemail.com','h8s.org',
  'haltospam.com','hochsitze.com','hotpop.com','hulapla.de','imails.info','inboxalias.com',
  'inboxbear.com','inboxclean.com','inboxclean.org','incognitomail.com','incognitomail.net','incognitomail.org',
  'ipoo.org','irish2me.com','iwi.net','jetable.com','jetable.fr.nf','jetable.net',
  'jetable.org','jnxjn.com','jourrapide.com','junk1e.com','kasmail.com','kaspop.com',
  'keepmymail.com','killmail.com','killmail.net','klassmaster.com','klassmaster.net','klzlk.com',
  'kulturbetrieb.info','kurzepost.de','lavabit.com','letthemeatspam.com','lhsdv.com','link2mail.net',
  'litedrop.com','lookugly.com','lopl.co.cc','lortemail.dk','lroid.com','lukop.dk',
  'm4ilweb.info','maboard.com','mail-filter.com','mail-temporaire.fr','mail.by','mail.mezimages.net',
  'mail2rss.org','mail333.com','mailbidon.com','mailblocks.com','mailcatch.com','maildrop.cc',
  'maileater.com','mailexpire.com','mailfa.tk','mailforspam.com','mailfreeonline.com','mailguard.me',
  'mailin8r.com','mailinater.com','mailinator.com','mailinator.net','mailinator.org','mailinator2.com',
  'mailincubator.com','mailismagic.com','mailme.lv','mailme24.com','mailmetrash.com','mailmoat.com',
  'mailnator.com','mailnesia.com','mailnull.com','mailscrap.com','mailshell.com','mailsiphon.com',
  'mailslite.com','mailtemp.info','mailtome.de','mailtothis.com','mailtrash.net','mailtv.net',
  'mailtv.tv','mailzilla.com','mailzilla.org','mbx.cc','mega.zik.dj','meinspamschutz.de',
  'meltmail.com','messagebeamer.de','mierdamail.com','mintemail.com','misterpinball.de','moncourrier.fr.nf',
  'monemail.fr.nf','monmail.fr.nf','msa.minsmail.com','mt2009.com','mt2014.com','mycard.net.ua',
  'mycleaninbox.net','mymail-in.net','mypacks.net','mypartyclip.de','myphantomemail.com','mysamp.de',
  'mytempemail.com','mytempmail.com','mytrashmail.com','neomailbox.com','nepwk.com','nervmich.net',
  'nervtmich.net','netmails.com','netmails.net','netzidiot.de','neverbox.com','nice-4u.com',
  'nincsmail.hu','no-spam.ws','nobulk.com','noclickemail.com','nogmailspam.info','nomail.xl.cx',
  'nomail2me.com','nomorespamemails.com','nospam.ze.tc','nospam4.us','nospamfor.us','nospammail.net',
  'notmailinator.com','nowhere.org','nowmymail.com','nurfuerspam.de','nus.edu.sg','objectmail.com',
  'obobbo.com','odnorazovoe.ru','oneoffemail.com','onewaymail.com','online.ms','oopi.org',
  'ordinaryamerican.net','otherinbox.com','ovpn.to','owlpic.com','pancakemail.com','pimpedupmyspace.com',
  'pjjkp.com','plexolan.de','poofy.org','pookmail.com','privacy.net','privatdemail.net',
  'proxymail.eu','prtnx.com','putthisinyourspamdatabase.com','qq.com','quickinbox.com','rcpt.at',
  'recode.me','recursor.net','regbypass.com','regbypass.comsafe-mail.net','rejectmail.com','rklips.com',
  'rmqkr.net','rppkn.com','rtrtr.com','s0ny.net','safe-mail.net','safersignup.de',
  'safetymail.info','safetypost.de','sandelf.de','saynotospams.com','schafmail.de','selfdestructingmail.com',
  'sendspamhere.com','sharklasers.com','shiftmail.com','shitmail.me','shitware.nl','shmeriously.com',
  'shortmail.net','sibmail.com','skeefmail.com','slopsbox.com','smellfear.com','snakemail.com',
  'sneakemail.com','snkmail.com','sofimail.com','sofort-mail.de','softpls.asia','spam.la',
  'spam.su','spam4.me','spamavert.com','spambob.com','spambob.net','spambob.org',
  'spambog.com','spambog.de','spambog.ru','spambox.info','spambox.us','spamcannon.com',
  'spamcannon.net','spamcon.org','spamcorptastic.com','spamcowboy.com','spamcowboy.net','spamcowboy.org',
  'spamday.com','spamex.com','spamfree24.com','spamfree24.de','spamfree24.eu','spamfree24.info',
  'spamfree24.net','spamfree24.org','spamgoes.in','spamgourmet.com','spamgourmet.net','spamgourmet.org',
  'spamherelots.com','spamhereplease.com','spamhole.com','spamify.com','spaminator.de','spamkill.info',
  'spaml.com','spaml.de','spammotel.com','spamobox.com','spamoff.de','spamslicer.com',
  'spamspot.com','spamthis.co.uk','spamthisplease.com','spamtroll.net','speed.1s.fr','supergreatmail.com',
  'supermailer.jp','superrito.com','superstachel.de','suremail.info','talkinator.com','teewars.org',
  'teleworm.com','teleworm.us','temp-mail.com','temp-mail.org','temp-mail.ru','tempalias.com',
  'tempe-mail.com','tempemail.biz','tempemail.com','tempemail.co.za','tempemail.net','tempinbox.co.uk',
  'tempinbox.com','tempmail.eu','tempmail.it','tempmail2.com','tempmaildemo.com','tempmailer.com',
  'tempmailer.de','tempomail.fr','temporarily.de','temporarioemail.com.br','temporaryemail.net','temporaryforwarding.com',
  'temporaryinbox.com','temporarymailaddress.com','tempthe.net','thanksnospam.info','thankyou2010.com','thc.st',
  'thelimestones.com','thisisnotmyrealemail.com','thismail.net','throwawayemailaddress.com','tilien.com','tittbit.in',
  'tizi.com','tmail.ws','tmailinator.com','toiea.com','toomail.biz','topranklist.de',
  'tradermail.info','trash-amil.com','trash-mail.at','trash-mail.com','trash-mail.de','trash2009.com',
  'trashdevil.com','trashemail.de','trashmail.at','trashmail.com','trashmail.de','trashmail.me',
  'trashmail.net','trashmail.org','trashmail.ws','trashmailer.com','trashymail.com','trashymail.net',
  'trbvm.com','trialmail.de','trillianpro.com','tyldd.com','uggsrock.com','upliftnow.com',
  'uplipht.com','uroid.com','us.af','venompen.com','veryrealemail.com','viditag.com',
  'viralplays.com','vpn.st','vsimcard.com','vubby.com','wasteland.rfc822.org','webemail.me',
  'weg-werf-email.de','wegwerf-email-addressen.de','wegwerf-emails.de','wegwerfadresse.de','wegwerfemail.com','wegwerfemail.de',
  'wegwerfmail.de','wegwerfmail.info','wegwerfmail.net','wegwerfmail.org','wh4f.org','whyspam.me',
  'willhackforfood.biz','willselfdestruct.com','winemaven.info','wronghead.com','wuzup.net','wuzupmail.net',
  'www.e4ward.com','www.gishpuppy.com','www.mailinator.com','wwwnew.eu','x.ip6.li','xagloo.com',
  'xemaps.com','xents.com','xmaily.com','xoxy.net','yep.it','yogamaven.com',
  'yopmail.com','yopmail.fr','yopmail.net','yourdomain.com','yuurok.com','z1p.biz',
  'za.com','zehnminuten.de','zehnminutenmail.de','zetmail.com','zippymail.info','zoemail.org',
  'zomg.info','zxcv.com','zxcvbnm.com','zzz.com'
]);

function checkOrigin(req) {
  const origin = req.headers.origin || req.headers.referer || '';
  if (!origin) return false;
  return ORIGIN_WHITELIST.some(re => re.test(origin));
}

function isValidEmailShape(email) {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isDisposable(email) {
  const domain = String(email || '').toLowerCase().split('@')[1];
  return !!(domain && DISPOSABLE_DOMAINS.has(domain));
}

function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  const lower = email.toLowerCase().trim();
  const atIdx = lower.indexOf('@');
  if (atIdx <= 0) return lower;
  const local = lower.slice(0, atIdx);
  const domain = lower.slice(atIdx + 1);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return local.replace(/\./g, '').split('+')[0] + '@gmail.com';
  }
  // For other providers, leave +tag alone (some companies route by subaddress).
  return local + '@' + domain;
}

function isSuspiciousName(name) {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 15) return false;
  if (/\s/.test(trimmed)) return false;
  const vowels = (trimmed.match(/[aeiouAEIOUáéíóúÁÉÍÓÚ]/g) || []).length;
  return (vowels / trimmed.length) < 0.25;
}

function checkTiming(ts) {
  if (!ts) return { ok: true, reason: 'missing' };
  const t = parseInt(ts, 10);
  if (!t || isNaN(t)) return { ok: false, reason: 'invalid' };
  const age = Date.now() - t;
  if (age < 1500) return { ok: false, reason: 'too-fast' };
  if (age > 30 * 60 * 1000) return { ok: false, reason: 'too-old' };
  return { ok: true, reason: 'ok' };
}

function setCors(req, res) {
  const origin = req.headers.origin || '';
  if (ORIGIN_WHITELIST.some(re => re.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function silentOk(res) {
  return res.status(200).json({ ok: true });
}

// Returns { allow: true, normalizedEmail } on success
// Returns { allow: false, response } where response is an already-sent res object
function botGuard(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return { allow: false, handled: true };
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return { allow: false, handled: true };
  }

  if (!checkOrigin(req)) {
    res.status(403).json({ error: 'Forbidden' });
    return { allow: false, handled: true, reason: 'origin' };
  }

  const body = req.body || {};
  const { email, nombre, _hp, _ts } = body;

  if (_hp) {
    silentOk(res);
    return { allow: false, handled: true, reason: 'honeypot' };
  }

  const timing = checkTiming(_ts);
  if (!timing.ok && timing.reason !== 'missing') {
    silentOk(res);
    return { allow: false, handled: true, reason: 'timing:' + timing.reason };
  }

  if (!email || !isValidEmailShape(email)) {
    res.status(400).json({ error: 'Invalid email' });
    return { allow: false, handled: true, reason: 'email-shape' };
  }

  if (isDisposable(email)) {
    silentOk(res);
    return { allow: false, handled: true, reason: 'disposable' };
  }

  if (isSuspiciousName(nombre)) {
    silentOk(res);
    return { allow: false, handled: true, reason: 'random-name' };
  }

  return {
    allow: true,
    handled: false,
    normalizedEmail: normalizeEmail(email)
  };
}

export {
  botGuard,
  normalizeEmail,
  isValidEmailShape,
  isDisposable,
  isSuspiciousName,
  checkOrigin,
  setCors
};
