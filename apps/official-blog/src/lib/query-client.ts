import { QueryClient } from '@tanstack/react-query';

// 클라이언트 환경에서만 유지할 싱글톤
let clientQueryClient: QueryClient | null = null;

function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return queryClient;
}

export function getQueryClient() {
  // 서버: 매 요청마다 새로 생성
  if (typeof window === 'undefined') {
    return createQueryClient();
  }

  // 클라이언트: 싱글톤 재사용
  if (!clientQueryClient) {
    clientQueryClient = createQueryClient();
  }

  return clientQueryClient;
}
