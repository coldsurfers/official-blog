import { pretendard } from '@/lib/pretendard';
import { OceanRoadThemeRegistry } from '@/registries/ocean-road-registry';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <OceanRoadThemeRegistry>{children}</OceanRoadThemeRegistry>
      </body>
    </html>
  );
}
