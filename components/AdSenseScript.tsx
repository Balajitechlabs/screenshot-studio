export const ADSENSE_CLIENT = "ca-pub-8704843786311642";

/** AdSense loader for content pages only; editor workspaces and error pages never render it. */
export function AdSenseScript() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
