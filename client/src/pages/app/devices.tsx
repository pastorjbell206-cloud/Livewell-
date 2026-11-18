/**
 * The drawings for /app ("Get LiveWell on your phone or computer"), in the
 * art kit's hand (components/art/README.md): ink outlines on paper, one tone
 * block printed off register, hatch for shade, one mustard mark each (the
 * thing to tap). Kept with the page, so they load with it and nowhere else.
 */
import type { Drawing } from "@/components/art/PlateSvg";
import type { Device } from "@/lib/install";

/** The page top: a laptop with a phone in front of it, LiveWell's icon gilded on the phone. */
export const DEVICES: Drawing = {
  w: 400,
  h: 300,
  label: "A laptop with a phone in front of it, LiveWell's icon on the phone's screen.",
  draw: (h) => (
    <>
      <path fill={h.h1} d="M0,0H400V214H0Z" />
      <path className="pl-o" d="M0,214H400V300H0Z" />
      <path fill={h.hh} d="M0,236H400V300H0Z" />
      <path className="pl-o" d="M70,56H290V196H70Z" />
      <path className="pl-g" d="M70,56H290V196H70Z" transform="translate(4,3)" />
      <path className="pl-l" d="M70,56H290V196H70Z" />
      <path className="pl-o" d="M84,70H276V184H84Z" />
      <path className="pl-f" d="M98,90H220M98,102H250M98,114H236M98,126H214M98,146H250M98,158H226M98,170H240" />
      <path className="pl-o" d="M50,196H310L332,216H28Z" />
      <path fill={h.h2} d="M50,196H310L332,216H28Z" />
      <path className="pl-l" d="M50,196H310L332,216H28Z" />
      <path className="pl-o" d="M268,104H344V256H268Z" />
      <path className="pl-c" d="M268,104H344V256H268Z" transform="translate(4,3)" />
      <path className="pl-l" d="M268,104H344V256H268Z" />
      <path className="pl-o" d="M276,120H336V238H276Z" />
      <path className="pl-m" d="M294,160H318V184H294Z" />
      <path className="pl-l" d="M294,160H318V184H294Z" />
      <path className="pl-l" d="M302,165V178H312" />
      <path className="pl-l" d="M298,246H314" />
    </>
  ),
};

/** One small drawing per device, beside its steps. */
export const DEVICE_DRAWINGS: Record<Device, Drawing> = {
  iphone: {
    w: 240,
    h: 180,
    label: "An iPhone with Safari's Share button gilded at the foot of the screen.",
    draw: (h) => (
      <>
        <path fill={h.h1} d="M0,0H240V180H0Z" />
        <path className="pl-o" d="M80,10H160V172H80Z" />
        <path className="pl-b" d="M80,10H160V172H80Z" transform="translate(4,3)" />
        <path className="pl-l" d="M80,10H160V172H80Z" />
        <path className="pl-o" d="M88,24H152V164H88Z" />
        <path className="pl-f" d="M96,40H144M96,50H138M96,60H142M96,70H130M96,86H144M96,96H136M96,106H140" />
        <path className="pl-l" d="M88,138H152" />
        <path className="pl-o" d="M112,148H128V160H112Z" />
        <path className="pl-m" d="M120,136L114,143H118V153H122V143H126Z" />
        <path className="pl-l" d="M120,136L114,143H118V153H122V143H126Z" />
      </>
    ),
  },
  android: {
    w: 240,
    h: 180,
    label: "An Android phone with Chrome's menu open and its Install line gilded.",
    draw: (h) => (
      <>
        <path fill={h.h1} d="M0,0H240V180H0Z" />
        <path className="pl-o" d="M80,10H160V172H80Z" />
        <path className="pl-g" d="M80,10H160V172H80Z" transform="translate(4,3)" />
        <path className="pl-l" d="M80,10H160V172H80Z" />
        <path className="pl-o" d="M88,24H152V164H88Z" />
        <path className="pl-l" d="M88,40H152" />
        <path className="pl-k" d="M144,28h4v4h-4ZM144,33h4v4h-4Z" />
        <path className="pl-f" d="M94,120H146M94,130H140M94,140H144M94,150H132" />
        <path className="pl-o" d="M98,44H150V108H98Z" />
        <path fill={h.hs} d="M98,44H150V108H98Z" />
        <path className="pl-l" d="M98,44H150V108H98Z" />
        <path className="pl-o" d="M104,52H144V60H104Z" />
        <path className="pl-m" d="M104,72H144V84H104Z" />
        <path className="pl-l" d="M104,72H144V84H104Z" />
        <path className="pl-o" d="M104,94H144V102H104Z" />
      </>
    ),
  },
  mac: {
    w: 240,
    h: 180,
    label: "A Mac laptop with LiveWell gilded in the Dock.",
    draw: (h) => (
      <>
        <path fill={h.h1} d="M0,0H240V180H0Z" />
        <path className="pl-o" d="M40,20H200V134H40Z" />
        <path className="pl-g" d="M40,20H200V134H40Z" transform="translate(4,3)" />
        <path className="pl-l" d="M40,20H200V134H40Z" />
        <path className="pl-o" d="M50,30H190V126H50Z" />
        <path className="pl-f" d="M60,44H160M60,54H176M60,64H150M60,74H170M60,84H140" />
        <path className="pl-o" d="M72,104H168V120H72Z" />
        <path className="pl-l" d="M78,108h8v8h-8ZM92,108h8v8h-8ZM106,108h8v8h-8ZM134,108h8v8h-8ZM148,108h8v8h-8Z" />
        <path className="pl-m" d="M120,108h8v8h-8Z" />
        <path className="pl-l" d="M120,108h8v8h-8Z" />
        <path className="pl-o" d="M24,134H216L226,150H14Z" />
        <path fill={h.h2} d="M24,134H216L226,150H14Z" />
        <path className="pl-l" d="M24,134H216L226,150H14Z" />
      </>
    ),
  },
  windows: {
    w: 240,
    h: 180,
    label: "A computer screen with the browser's install button gilded at the end of the address bar.",
    draw: (h) => (
      <>
        <path fill={h.h1} d="M0,0H240V180H0Z" />
        <path className="pl-o" d="M30,14H210V134H30Z" />
        <path className="pl-b" d="M30,14H210V134H30Z" transform="translate(4,3)" />
        <path className="pl-l" d="M30,14H210V134H30Z" />
        <path className="pl-o" d="M40,24H200V124H40Z" />
        <path className="pl-o" d="M48,30H192V44H48Z" />
        <path className="pl-f" d="M54,37H140" />
        <path className="pl-m" d="M176,32h12v10h-12Z" />
        <path className="pl-l" d="M176,32h12v10h-12ZM182,33v6M179,37l3,3l3,-3" />
        <path className="pl-f" d="M52,60H170M52,70H186M52,80H160M52,90H176M52,100H150" />
        <path className="pl-k" d="M112,134H128V156H112Z" />
        <path className="pl-o" d="M80,156H160V166H80Z" />
        <path fill={h.h2} d="M80,156H160V166H80Z" />
        <path className="pl-l" d="M80,156H160V166H80Z" />
      </>
    ),
  },
};
