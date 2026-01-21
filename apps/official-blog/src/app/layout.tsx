import { pretendard } from '@/lib/pretendard';
import { ErrorBoundaryRegistry } from '@/registries/error-boundary-registry';
import { OceanRoadThemeRegistry } from '@/registries/ocean-road-registry';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <OceanRoadThemeRegistry>
          <ErrorBoundaryRegistry>{children}</ErrorBoundaryRegistry>
        </OceanRoadThemeRegistry>
      </body>
    </html>
  );
}
