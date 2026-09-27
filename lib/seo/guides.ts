import { MAX_DEVICE_MOCKUPS } from "@/lib/constants/mockups";
import { howToGuides } from "@/lib/seo/how-to-guides";
import {
  IMAGE_FORMATS_SENTENCE,
  PRODUCT_FACTS,
  VIDEO_FORMATS_SENTENCE,
  atLeast,
} from "@/lib/seo/product-facts";

/** The date every tool detail in the roundup guides was last checked against the vendor's own site. */
export const GUIDES_UPDATED = "2026-09-24";

/** The date the how-to guides were last checked against the editor. */
export const HOW_TO_UPDATED = "2026-09-27";

export function formatGuideDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export const GUIDES_UPDATED_LABEL = formatGuideDate(GUIDES_UPDATED);

export interface GuideTool {
  name: string;
  url: string;
  bestFor: string;
  price: string;
  platform: string;
  summary: string;
  limitations: string;
}

interface GuideBase {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  answer: string;
  faqs: { q: string; a: string }[];
}

export interface RoundupGuide extends GuideBase {
  kind: "roundup";
  criteria: string;
  tools: GuideTool[];
}

export interface GuideLink {
  href: string;
  label: string;
}

export interface HowToGuide extends GuideBase {
  kind: "how-to";
  topic: "markup" | "present" | "publish";
  cta: GuideLink;
  steps: { title: string; body: string }[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  related: GuideLink[];
}

export type Guide = RoundupGuide | HowToGuide;

const STUDIO_LICENSE = `Free, open source (${PRODUCT_FACTS.license})`;

const DEVICESHOTS: GuideTool = {
  name: "DeviceShots",
  url: "https://deviceshots.com",
  bestFor: "The biggest free device catalog",
  price: "Free",
  platform: "Browser",
  summary:
    "76 frames across phones, iPads, laptops, iMacs, displays, watches, and 9 browser window styles. Exports PNG, JPG, WebP, or SVG at up to 4x, with no account, no watermark, and no upload.",
  limitations: "Flat frames only: no 3D tilt, perspective, or video export.",
};

const SNAPMOCK: GuideTool = {
  name: "SnapMock",
  url: "https://snapmock.app",
  bestFor: "Free perspective presets",
  price: "Free; 4x export is paid",
  platform: "Browser",
  summary:
    "Flat, isometric, tilted, and hero-shot perspective presets around iPhone, iPad, MacBook, Pixel, and browser frames. No signup, no watermark, and commercial use is allowed.",
  limitations:
    "Free exports are 1x or 2x, 4x needs a paid plan, and export is static PNG or JPEG only.",
};

const MOCKUPHONE: GuideTool = {
  name: "MockUPhone",
  url: "https://mockuphone.com",
  bestFor: "Android, Samsung, and older device models",
  price: "Free, open source (Apache 2.0)",
  platform: "Browser",
  summary:
    "A long device list covering iPhone, Pixel, Samsung Galaxy, iPad, MacBook, Dell XPS, Surface, Apple Watch, and even TVs. The code is public on GitHub.",
  limitations: "A frame-only tool: its site lists no 3D, animation, or video features.",
};

const SHOTS_SO: GuideTool = {
  name: "Shots.so",
  url: "https://shots.so",
  bestFor: "Polished templates and animated mockups",
  price: "Free, Basic, and Pro plans",
  platform: "Browser",
  summary:
    "Many device models, including iPhone, Android phones, iPads, and desktops, plus 3D shapes, shadow overlays, and animation presets for short product videos.",
  limitations: "Some features and limits sit on paid plans, and it is closed source.",
};

const PIKA_STYLE: GuideTool = {
  name: "Pika Style",
  url: "https://pika.style",
  bestFor: "Template variety",
  price: "Free plan; Pro $13/mo or $150/yr",
  platform: "Browser, plus Chrome and VS Code extensions",
  summary:
    "Templates for App Store screenshots, tweets, and code, with iPhone, iPad mini, Pixel, MacBook, and browser frames.",
  limitations:
    "Tilt, background images, and some templates are Pro only, and it lists no animation or video export.",
};

const BRANDBIRD: GuideTool = {
  name: "BrandBird",
  url: "https://brandbird.app",
  bestFor: "Marketing graphics with 3D rotation",
  price: "Free with watermark; Pro $15/mo; Lifetime $179",
  platform: "Browser, Mac app, Chrome extension, and Figma plugin",
  summary:
    "Turns screenshots into social graphics with iPhone, iPad, MacBook, Apple Watch, and browser frames, plus 3D rotation.",
  limitations: "Free exports carry a watermark that only Pro or Lifetime removes.",
};

const roundupGuides: RoundupGuide[] = [
  {
    kind: "roundup",
    slug: "best-free-screenshot-mockup-generators",
    title: "Best Free Screenshot Mockup Generators (2026)",
    metaDescription:
      "The best free online mockup generators for screenshots in 2026: Screenshot Studio, DeviceShots, SnapMock, MockUPhone, Shots.so, Pika Style, and Mockuuups Studio, compared on devices, 3D, video, and watermarks.",
    keywords: [
      "best free mockup generator",
      "free online mockup generator for screenshots",
      "screenshot mockup generator",
      "device mockup generator free",
      "free iphone mockup generator",
      "3d device mockup free",
      "mockup generator no watermark",
    ],
    answer:
      "The best free mockup generators for screenshots in 2026 are Screenshot Studio (3D angles, multi-device layouts, and video export), DeviceShots (76 device frames), SnapMock (perspective presets), and MockUPhone (open source, with Android and Samsung models). Screenshot Studio, DeviceShots, and SnapMock need no account and add no watermark. Shots.so and Pika Style offer more templates but keep some features on paid plans.",
    criteria:
      "We compared what each tool gives you for free: device range, 3D or perspective, animation and video export, export resolution, and whether free exports carry a watermark or need an account.",
    tools: [
      {
        name: "Screenshot Studio",
        url: "/mockup-generator",
        bestFor: "3D angles, multi-device layouts, and video, free",
        price: STUDIO_LICENSE,
        platform: "Browser",
        summary: `${PRODUCT_FACTS.deviceMockups} iPhone, MacBook, and Apple Watch mockups, some at 3D angles, plus Safari and Chrome browser frames and Arc, macOS, and Windows window frames. Place up to ${MAX_DEVICE_MOCKUPS} devices in one layout, add 3D perspective, and export ${IMAGE_FORMATS_SENTENCE} up to ${PRODUCT_FACTS.maxExportScale}x or animate to ${VIDEO_FORMATS_SENTENCE}. No signup, no watermark.`,
        limitations:
          "No iPad or Android devices yet, and fewer device models than DeviceShots or Shots.so.",
      },
      DEVICESHOTS,
      SNAPMOCK,
      MOCKUPHONE,
      SHOTS_SO,
      PIKA_STYLE,
      {
        name: "Mockuuups Studio",
        url: "https://mockuuups.studio",
        bestFor: "Realistic scene and print mockups",
        price: "Free tier with attribution; Pro $15/mo or $120/yr",
        platform: "Browser, Mac, Windows, Linux, and design-tool plugins",
        summary:
          "More than 5,200 device and print mockups, including angled scenes with iPhone, iPad, MacBook, iMac, and Apple Watch.",
        limitations:
          "The free tier has a limited collection, is for personal use, and requires attribution.",
      },
    ],
    faqs: [
      {
        q: "What is the best free mockup generator for screenshots?",
        a: "Screenshot Studio, DeviceShots, and SnapMock are the strongest free picks with no account and no watermark. Choose Screenshot Studio for 3D angles, multi-device layouts, and video export, DeviceShots for the largest device catalog, and SnapMock for quick perspective presets.",
      },
      {
        q: "Which mockup generators add a watermark on the free plan?",
        a: "BrandBird's free plan and Screenhance's free plan (3 exports a month) add a watermark, and Mockuuups Studio's free tier requires attribution. Screenshot Studio, DeviceShots, SnapMock, and Screely state that free exports have no watermark.",
      },
      {
        q: "Can I make a 3D device mockup for free?",
        a: "Yes. Screenshot Studio includes 3D perspective and angled iPhone and MacBook mockups for free, and SnapMock has free isometric and tilted presets. Pika Style puts tilt on its Pro plan.",
      },
      {
        q: "Which free mockup generator exports video?",
        a: `Screenshot Studio exports animated mockups as ${VIDEO_FORMATS_SENTENCE} for free. Shots.so has animation presets, and Screenhance exports GIF and WebM with clean MP4 on its Pro plan.`,
      },
      {
        q: "Do mockup generators upload my screenshot?",
        a: "Not all of them. DeviceShots keeps screenshots in the browser, and Screenshot Studio edits in the browser without uploading imported images. Check each tool's privacy policy before using sensitive screenshots elsewhere.",
      },
    ],
  },
  {
    kind: "roundup",
    slug: "best-free-screenshot-editors-no-watermark",
    title: "Best Free Screenshot Editors With No Watermark (2026)",
    metaDescription:
      "Free screenshot editors that never add a watermark: Screenshot Studio, ShareX, Flameshot, Greenshot, Screenshot Editor, Guidejar, Photopea, and the tools built into Windows and macOS.",
    keywords: [
      "free screenshot editor no watermark",
      "best free screenshot editor",
      "screenshot editor online free",
      "blur screenshot online free",
      "sharex alternative",
      "greenshot alternative",
      "flameshot alternative",
      "free screenshot annotation tool",
    ],
    answer:
      "The best free screenshot editors with no watermark are Screenshot Studio (in the browser, with blur, arrows, backgrounds, and mockups), ShareX (capture and annotation on Windows), Flameshot (Windows, macOS, and Linux), and Greenshot (free on Windows). For quick blur and redaction in a browser tab, Screenshot Editor and Guidejar are also free, with no watermark and no account.",
    criteria:
      "We kept tools that export without a watermark on the free plan, then compared platform, built-in screen capture, annotation and redaction tools, and account requirements.",
    tools: [
      {
        name: "Screenshot Studio",
        url: "/free-screenshot-editor",
        bestFor: "Redacting and polishing screenshots in any browser",
        price: STUDIO_LICENSE,
        platform: "Browser on Mac, Windows, Linux, and Chromebook",
        summary: `Blur private details, add arrows, shapes, and text, then place the screenshot on one of ${atLeast(PRODUCT_FACTS.backgrounds)} backgrounds, in a device or browser mockup, or at a 3D angle. Exports ${IMAGE_FORMATS_SENTENCE} up to ${PRODUCT_FACTS.maxExportScale}x, or animate to ${VIDEO_FORMATS_SENTENCE}. No signup, no watermark.`,
        limitations:
          "No screen capture: take the screenshot with your OS or another tool, then paste or drop it in.",
      },
      {
        name: "ShareX",
        url: "https://getsharex.com",
        bestFor: "All-in-one capture on Windows",
        price: "Free, open source (GPL-3.0)",
        platform: "Windows",
        summary:
          "Captures the full screen, windows, regions, scrolling pages, and screen recordings, then annotates with arrows, shapes, text, blur, pixelate, highlight, and step numbers. No account required.",
        limitations: "Windows only.",
      },
      {
        name: "Flameshot",
        url: "https://flameshot.org",
        bestFor: "Cross-platform capture and markup, including Linux",
        price: "Free, open source (GPLv3)",
        platform: "Windows, macOS, Linux",
        summary:
          "Drag to capture a region, then annotate in place with arrows, lines, rectangles, circles, text, a marker, pixelate, and blur.",
        limitations: "Built for quick markup rather than backgrounds, mockups, or video.",
      },
      {
        name: "Greenshot",
        url: "https://getgreenshot.org",
        bestFor: "Lightweight capture on Windows",
        price: "Free on Windows; $1.99 on macOS",
        platform: "Windows, macOS",
        summary:
          "Captures a region, window, or the full screen, then lets you annotate, highlight, or obscure parts of the screenshot.",
        limitations: "The macOS version is a separate paid app.",
      },
      {
        name: "Screenshot Editor",
        url: "https://screenshoteditor.org",
        bestFor: "Redacting sensitive details in a browser",
        price: "Free",
        platform: "Browser",
        summary:
          "Add arrows, text, shapes, and highlights, or hide details with opaque redaction, blur, or pixelation. Edits run locally in the browser, with no account and no watermark.",
        limitations: "No screen capture: it edits images you upload.",
      },
      {
        name: "Guidejar Screenshot Editor",
        url: "https://www.guidejar.com/tools/screenshot-editor",
        bestFor: "Step-by-step how-to screenshots",
        price: "Free, unlimited exports",
        platform: "Browser",
        summary:
          "Rectangles, circles, arrows, auto-numbered steps, text, blur, crop, and layers on a browser canvas, with no account, no email, and no watermark.",
        limitations: "No screen capture in the editor itself: it works on images you add.",
      },
      {
        name: "Photopea",
        url: "https://www.photopea.com",
        bestFor: "Full layer-based image editing",
        price: "Free with ads; Premium $5/mo",
        platform: "Browser",
        summary:
          "A Photoshop-style editor with layers, masks, blur filters, and vector tools that also opens PSD files. No download or account needed.",
        limitations:
          "A general image editor, so simple screenshot markup takes more steps than in a dedicated tool.",
      },
      {
        name: "Windows Snipping Tool",
        url: "https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b",
        bestFor: "Quick capture with nothing to install on Windows",
        price: "Free, built into Windows",
        platform: "Windows",
        summary:
          "Captures the screen and marks it up with a pen, highlighter, shapes, and crop. Text actions copy text out of a screenshot.",
        limitations: "Basic markup only, and Microsoft's documentation lists no blur tool.",
      },
      {
        name: "macOS Screenshot and Markup",
        url: "https://support.apple.com/guide/mac-help/take-a-screenshot-or-screen-recording-mh26782/mac",
        bestFor: "Quick capture with nothing to install on a Mac",
        price: "Free, built into macOS",
        platform: "macOS",
        summary:
          "Press Shift-Command-5 to capture the screen, then mark up the screenshot before you save or share it.",
        limitations: "Basic markup only.",
      },
    ],
    faqs: [
      {
        q: "What is the best free screenshot editor with no watermark?",
        a: "It depends on where you work. Screenshot Studio is the best pick in a browser on any OS, with blur, arrows, backgrounds, and mockups. ShareX is the most complete on Windows, and Flameshot covers Windows, macOS, and Linux.",
      },
      {
        q: "Which free screenshot editor can blur sensitive information?",
        a: "Screenshot Studio, ShareX, Flameshot, Screenshot Editor, and Guidejar all include a blur tool. ShareX, Flameshot, and Screenshot Editor can also pixelate, and Screenshot Editor has opaque redaction.",
      },
      {
        q: "Is there a free screenshot editor for Chromebook or Linux?",
        a: "Yes. Browser-based editors such as Screenshot Studio, Screenshot Editor, Guidejar, and Photopea work on a Chromebook. On Linux, Flameshot is a native option, and the browser tools work too.",
      },
      {
        q: "Do built-in tools like Snipping Tool add a watermark?",
        a: "No. Windows Snipping Tool and the macOS Screenshot app are free and add no watermark, but their markup tools are basic.",
      },
      {
        q: "Which screenshot tools limit their free plan?",
        a: "Markup Hero lets you create 5 markups without an account, then asks you to sign up for a free account. Photopea is free but shows ads unless you pay $5 a month.",
      },
    ],
  },
  {
    kind: "roundup",
    slug: "best-code-to-image-tools",
    title: "Best Code to Image Tools for READMEs and Social Posts (2026)",
    metaDescription:
      "The best tools for turning code into images in 2026: Carbon, Ray.so, Screenshot Studio, CodeSnap, CodeImage, and Snappify, compared on themes, backgrounds, export formats, and price.",
    keywords: [
      "best code to image tool",
      "code screenshot tool",
      "code screenshots for readme",
      "carbon alternative",
      "ray.so alternative",
      "codesnap vs carbon",
      "code to png",
    ],
    answer: `Carbon is the best-known free code to image tool, with 29 themes and PNG or SVG export. Ray.so is the quickest way to a clean snippet. Screenshot Studio adds gradient, image, and pattern backgrounds, transparent PNGs for GitHub READMEs, and a full editor for mockups and video, with ${PRODUCT_FACTS.codeThemes} themes. To stay inside your editor, the CodeSnap VS Code extension is free and uses your own theme.`,
    criteria:
      "We compared tools that turn source code into an image on themes, backgrounds, export formats, open source status, and whether you need an account.",
    tools: [
      {
        name: "Carbon",
        url: "https://carbon.now.sh",
        bestFor: "The widest theme choice and SVG export",
        price: "Free, open source (MIT)",
        platform: "Browser",
        summary:
          "29 syntax themes, a background color or your own image, and PNG or SVG export. An account is only needed to save snippets.",
        limitations: "No gradient background presets.",
      },
      {
        name: "Ray.so",
        url: "https://ray.so",
        bestFor: "Quick, polished snippets",
        price: "Free, open source (MIT)",
        platform: "Browser, plus a Raycast extension",
        summary:
          "Made by Raycast: paste code, pick a theme, background, and padding, and export an image in seconds.",
        limitations: "Static image export only.",
      },
      {
        name: "Screenshot Studio",
        url: "/code",
        bestFor: "README images, and code inside mockups or video",
        price: STUDIO_LICENSE,
        platform: "Browser",
        summary: `${PRODUCT_FACTS.codeThemes} syntax themes, ${PRODUCT_FACTS.codeLanguages} languages, line numbers, a macOS title bar, and gradient, image, or pattern backgrounds. Turn the background off for a transparent PNG that works in GitHub light and dark mode, export at 2x or 4x, and share a link that reopens your exact design.`,
        limitations:
          "Fewer themes than Carbon, and the code editor exports PNG only (no SVG).",
      },
      {
        name: "CodeSnap",
        url: "https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap",
        bestFor: "Screenshots without leaving VS Code",
        price: "Free, open source (MIT)",
        platform: "VS Code on Windows, macOS, and Linux",
        summary:
          "Captures selected code with your current VS Code theme and font, with options for background color, shadow, padding, window controls, line numbers, and a transparent background. Over 3.9 million installs.",
        limitations: "PNG only, and the look depends on your editor theme.",
      },
      {
        name: "CodeImage",
        url: "https://codeimage.dev",
        bestFor: "An open source web app with its own themes",
        price: "Open source (MIT)",
        platform: "Browser",
        summary: "A web app for creating and sharing code screenshots, with 20+ custom themes.",
        limitations: "Its site does not list export formats or plan limits.",
      },
      {
        name: "Snappify",
        url: "https://snappify.com",
        bestFor: "Animated code presentations and videos",
        price: "Free plan (3 snaps); Starter $5/mo; Pro $9/mo",
        platform: "Browser, plus VS Code and IntelliJ extensions",
        summary:
          "Build code slides and short videos with multiple code windows, arrows, and animation, then export PNG, MP4, or GIF.",
        limitations:
          "Free-plan presentation and video exports carry a watermark, and saving work needs an account.",
      },
    ],
    faqs: [
      {
        q: "What is the best tool to make code screenshots for a README?",
        a: "Any tool that exports a sharp PNG works. Screenshot Studio and CodeSnap can export a transparent background, which sits cleanly in both GitHub light and dark mode. Commit the image to your repository and reference it with a relative path, which is what GitHub recommends for images stored in a repo.",
      },
      {
        q: "How do I show a different code image in GitHub dark mode?",
        a: "Export a light and a dark version, then wrap them in an HTML picture element with a prefers-color-scheme source. GitHub supports the picture element in Markdown files and shows the matching image to each reader.",
      },
      {
        q: "Is Carbon or Ray.so better?",
        a: "Carbon has more themes (29) and SVG export. Ray.so is quicker for a single good-looking snippet. Both are free and open source under the MIT license.",
      },
      {
        q: "Can I turn a code snippet into a video?",
        a: `Yes. Snappify animates code, with watermarked video on its free plan. In Screenshot Studio, export the code image, open it in the main editor, add an animation preset, and export ${VIDEO_FORMATS_SENTENCE} for free.`,
      },
      {
        q: "Should I use an image or a code block in my README?",
        a: "Use a fenced code block for anything readers need to copy or search, and an image for a hero example or visual comparison. Many READMEs show the image and put the copyable code right below it.",
      },
    ],
  },
  {
    kind: "roundup",
    slug: "best-free-shots-so-alternatives",
    title: "Best Free Shots.so Alternatives (2026)",
    metaDescription:
      "Free alternatives to Shots.so for screenshot mockups: Screenshot Studio, DeviceShots, SnapMock, Pika Style, Screely, MockUPhone, and BrandBird, compared on devices, 3D, video, and watermarks.",
    keywords: [
      "shots.so alternative",
      "best free alternatives to shots.so",
      "shots so alternative free",
      "sites like shots.so",
      "shots.so competitor",
      "free mockup generator",
    ],
    answer:
      "The best free Shots.so alternatives are Screenshot Studio (3D, animation, and video export, free and open source), DeviceShots (76 device frames with no account or watermark), and SnapMock (free perspective presets). Pika Style is closest in template variety but puts tilt on Pro, and Screely is the simplest choice for window frames. Shots.so still has more device models than most, including Android phones and iPads.",
    criteria:
      "Each pick covers Shots.so's core job, putting a screenshot in a device or window frame on a background, and we noted what each one does for free.",
    tools: [
      {
        name: "Screenshot Studio",
        url: "/compare/shots-so",
        bestFor: "Shots.so-style 3D and animation, free",
        price: STUDIO_LICENSE,
        platform: "Browser",
        summary: `iPhone, MacBook, and Apple Watch mockups, 3D perspective, a keyframe animation timeline with ${atLeast(PRODUCT_FACTS.animationPresets)} presets, and ${VIDEO_FORMATS_SENTENCE} export, plus a code to image editor and a blur tool. No account and no watermark.`,
        limitations: "Fewer device models: no Android phones or iPads yet.",
      },
      DEVICESHOTS,
      SNAPMOCK,
      PIKA_STYLE,
      {
        name: "Screely",
        url: "https://screely.app",
        bestFor: "Simple window frames",
        price: "Free",
        platform: "Browser, plus a Chrome extension",
        summary:
          "Wrap a screenshot in a macOS or Windows window frame on a background and export a high-resolution PNG or PDF. The Chrome extension records tab demos. No signup, no watermark, no export limits.",
        limitations: "No device mockups or 3D.",
      },
      MOCKUPHONE,
      BRANDBIRD,
    ],
    faqs: [
      {
        q: "What is the best free alternative to Shots.so?",
        a: "Screenshot Studio is the closest free match if you use Shots.so for 3D and animated mockups: it includes 3D perspective, an animation timeline, and video export with no account and no watermark, and it is open source. If you mainly need more device models, DeviceShots has 76 frames for free.",
      },
      {
        q: "Is Shots.so free?",
        a: "Shots.so has Free, Basic, and Pro plans, with some features and limits reserved for the paid tiers. Check shots.so for current plan limits.",
      },
      {
        q: "Which Shots.so alternatives have Android and iPad mockups?",
        a: "MockUPhone and SnapMock include iPad and Pixel frames for free, and MockUPhone adds Samsung Galaxy models. DeviceShots also has iPad frames. Screenshot Studio covers iPhone, MacBook, and Apple Watch, but not Android or iPad yet.",
      },
      {
        q: "Are there open source alternatives to Shots.so?",
        a: `Yes. Screenshot Studio (${PRODUCT_FACTS.license}) and MockUPhone (Apache 2.0) are open source. Shots.so has no public source code.`,
      },
    ],
  },
  {
    kind: "roundup",
    slug: "best-free-screely-alternatives",
    title: "Best Free Screely Alternatives (2026)",
    metaDescription:
      "Free alternatives to Screely for framing screenshots: Screenshot Studio, DeviceShots, SnapMock, Shots.so, Pika Style, MockUPhone, and BrandBird, compared on frames, 3D, and video.",
    keywords: [
      "screely alternative",
      "screely alternatives",
      "sites like screely",
      "screely vs",
      "screenshot window frame online",
      "free screenshot mockup tool",
    ],
    answer:
      "Screely is a free, simple way to put a screenshot in a macOS or Windows window on a background. If you need more, Screenshot Studio adds device mockups, 3D perspective, annotation, blur, and video export for free; DeviceShots has the biggest free device catalog; and SnapMock adds free perspective presets. Screely is still the quickest option for a plain window frame, and it exports PDF, which most alternatives do not.",
    criteria:
      "Each pick does Screely's core job, framing a screenshot on a background for free, and adds at least one thing Screely does not: device frames, 3D, annotation, or video.",
    tools: [
      {
        name: "Screenshot Studio",
        url: "/compare/screely",
        bestFor: "Window frames plus devices, 3D, and video",
        price: STUDIO_LICENSE,
        platform: "Browser",
        summary: `Safari and Chrome window frames in light and dark with an editable URL bar, iPhone, MacBook, and Apple Watch mockups, 3D perspective, arrows, text, and blur, plus a keyframe animation timeline with ${atLeast(PRODUCT_FACTS.animationPresets)} presets. Exports ${IMAGE_FORMATS_SENTENCE} images and MP4 or WebM video, with no account and no watermark.`,
        limitations: "No PDF export and no browser extension for capturing tabs.",
      },
      DEVICESHOTS,
      SNAPMOCK,
      SHOTS_SO,
      PIKA_STYLE,
      MOCKUPHONE,
      BRANDBIRD,
    ],
    faqs: [
      {
        q: "What is the best free alternative to Screely?",
        a: "Screenshot Studio is the closest free upgrade: it keeps Screely's window frames and backgrounds and adds device mockups, 3D, annotation, blur, and video export, with no account and no watermark. For the largest set of free device frames, try DeviceShots.",
      },
      {
        q: "Is Screely free?",
        a: "Yes. Screely's site lists no signup, no watermark, and no export limits.",
      },
      {
        q: "Which Screely alternatives have phone mockups?",
        a: "Screenshot Studio, DeviceShots, SnapMock, Shots.so, Pika Style, MockUPhone, and BrandBird all include phone frames. MockUPhone and SnapMock also cover Android devices.",
      },
      {
        q: "Can I annotate screenshots in a Screely alternative?",
        a: "Yes. Screenshot Studio has arrows, lines, shapes, text, and blur or mosaic regions in the same editor as its frames and backgrounds.",
      },
    ],
  },
];

export const guides: Guide[] = [...howToGuides, ...roundupGuides];

export function guideUpdated(guide: Guide): string {
  return guide.kind === "roundup" ? GUIDES_UPDATED : HOW_TO_UPDATED;
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guideCover(slug: string): string {
  return `/guide-covers/${slug}.webp`;
}

/** Title without its trailing qualifier such as "(2026)" or "(Free)". */
export function guideShortTitle(guide: Guide): string {
  return guide.title.replace(/\s*\([^)]*\)$/, "");
}

/** Estimated reading time in minutes at 220 words per minute. */
export function readingMinutes(guide: Guide): number {
  const body =
    guide.kind === "roundup"
      ? [guide.criteria, ...guide.tools.flatMap((tool) => [tool.summary, tool.limitations])]
      : [
          ...guide.steps.map((step) => step.body),
          ...guide.sections.flatMap((section) => [
            ...section.paragraphs,
            ...(section.bullets ?? []),
          ]),
        ];
  const words = [guide.answer, ...body, ...guide.faqs.flatMap((faq) => [faq.q, faq.a])]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
