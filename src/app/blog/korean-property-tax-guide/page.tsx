import Link from "next/link";

export default function KoreanPropertyTaxPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog/"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        ← 블로그로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        2024년 부동산 취득세 완벽 가이드 - 다주택자·생애최초 감면까지
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <time>2024.12.14</time>
        <span>·</span>
        <span>읽기 10분</span>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed">
          집을 살 때 가격 외에도 여러 세금을 내야 합니다. 그 중 가장 큰 비중을 차지하는 것이 바로 취득세입니다.
          5억 원짜리 아파트를 살 때 취득세만 수백만 원이 될 수 있습니다.
          이 글에서는 취득세의 기본 구조부터 다주택자 중과, 생애최초 감면까지 2024년 기준으로 정리했습니다.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">주의사항</p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            세법은 자주 변경됩니다. 이 글은 2024년 기준 참고 정보입니다. 실제 세금 납부 전 반드시 관할 구청이나 세무사에게 정확한 금액을 확인하세요.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">취득세란?</h2>
        <p className="mb-4 leading-relaxed">
          취득세는 부동산, 차량, 선박 등 과세 대상을 취득할 때 내는 지방세입니다.
          부동산의 경우 매매, 신축, 상속, 증여 모두 취득세 과세 대상입니다.
          취득세와 함께 지방교육세, 농어촌특별세도 함께 납부해야 하므로 실제 부담액은 취득세보다 더 큽니다.
        </p>
        <p className="mb-4 leading-relaxed">
          취득세는 잔금일(소유권 이전일)로부터 60일 이내에 관할 시·군·구청에 신고·납부해야 합니다.
          기한을 초과하면 무신고 가산세 20%와 납부지연 가산세가 추가됩니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">주택 취득세 기본 세율표 (1주택자)</h2>
        <p className="mb-4 leading-relaxed">
          1주택자(조정대상지역 여부 무관)의 취득세율은 주택 가격에 따라 달라집니다:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">취득 가액</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">취득세율</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">지방교육세</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">합계</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">6억 원 이하</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">0.1%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">1.1%</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">6억 초과 ~ 9억 이하</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1~3% (누진)</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">0.1~0.3%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">1.1~3.3%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">9억 원 초과</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">3%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">0.3%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">3.3%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4 leading-relaxed text-sm text-slate-500 dark:text-slate-400">
          ※ 85㎡ 초과 주택은 농어촌특별세 0.2%가 추가됩니다. 85㎡ 이하는 농특세 면제.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">6억~9억 구간 누진세율 계산법</h3>
        <p className="mb-4 leading-relaxed">
          6억~9억 구간은 단순히 일정 세율을 적용하는 것이 아니라, 취득가액에 따라 세율이 선형적으로 증가합니다:
        </p>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 font-mono text-sm">
          <p>세율 = (취득가액 × 2/3억 - 3) × 1/100</p>
        </div>
        <p className="mb-4 leading-relaxed">
          예를 들어 7억 5,000만 원짜리 주택의 취득세율: (7.5억 × 2/3억 - 3) × 1/100 = 2% → 세금 1,500만 원
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">다주택자 취득세 중과세율</h2>
        <p className="mb-4 leading-relaxed">
          2주택 이상부터는 중과세율이 적용됩니다. 조정대상지역 여부에 따라 세율이 달라집니다:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">주택 수</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">조정대상지역</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">비조정대상지역</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1주택</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1~3%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1~3%</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">2주택</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-orange-600 dark:text-orange-400 font-semibold">8%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1~3%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">3주택</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400 font-semibold">12%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-orange-600 dark:text-orange-400 font-semibold">8%</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">4주택 이상 / 법인</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400 font-semibold">12%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-red-600 dark:text-red-400 font-semibold">12%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4 leading-relaxed">
          조정대상지역에서 2번째 주택을 살 경우 취득세율이 8%로 급격히 높아집니다.
          5억 원짜리 아파트를 사면 취득세만 4,000만 원입니다. 이는 큰 부담이므로 사전에 철저히 확인해야 합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">생애최초 주택 구입 취득세 감면</h2>
        <p className="mb-4 leading-relaxed">
          생애 처음으로 주택을 구입하는 경우 취득세를 감면받을 수 있습니다.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-3">감면 요건</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>본인과 배우자가 주택을 소유한 이력이 없을 것 (생애 최초)</li>
          <li>취득가액 12억 원 이하 주택</li>
          <li>취득 후 3개월 이내 실거주 의무 (주민등록 전입)</li>
          <li>3년 이내 해당 주택 매각·증여·임대 금지</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6 mb-3">감면 내용</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>취득세 최대 200만 원 감면 (200만 원 초과분은 50% 감면)</li>
          <li>12억 원 이하 주택 구입 시 적용</li>
        </ul>
        <p className="mb-4 leading-relaxed">
          예를 들어 4억 원짜리 주택을 생애최초로 구입하면 취득세(1%) 400만 원에서 200만 원을 감면받아
          실제로는 200만 원만 납부하면 됩니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">실제 계산 예시</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">예시 1: 서울 아파트 5억 원, 1주택자</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
          <li>취득세 1%: 500만 원</li>
          <li>지방교육세 0.1%: 50만 원</li>
          <li>농어촌특별세: 해당 없음 (85㎡ 이하 가정)</li>
          <li className="font-semibold">합계: 550만 원</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">예시 2: 서울 아파트 7억 원, 1주택자</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
          <li>취득세율 계산: (7억 × 2/3억 - 3) × 1% = 약 1.67%</li>
          <li>취득세: 약 1,167만 원</li>
          <li>지방교육세: 약 116만 원</li>
          <li className="font-semibold">합계: 약 1,283만 원</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">예시 3: 조정대상지역 아파트 5억 원, 2주택자</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
          <li>취득세 8%: 4,000만 원</li>
          <li>지방교육세 0.4%: 200만 원</li>
          <li>농어촌특별세 0.6%: 300만 원</li>
          <li className="font-semibold">합계: 4,500만 원</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">취득세 외 추가 비용들</h2>
        <p className="mb-4 leading-relaxed">
          집을 살 때 취득세 외에도 여러 비용이 발생합니다:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>인지세:</strong> 1~35만 원 (주택 가격에 따라)</li>
          <li><strong>등기비용:</strong> 법무사 수수료 50~100만 원 내외</li>
          <li><strong>부동산 중개수수료:</strong> 0.3~0.9% (가격 구간별 상한선 있음)</li>
          <li><strong>이사비용:</strong> 거리·짐 양에 따라 50~300만 원</li>
          <li><strong>인테리어 비용:</strong> 선택 사항이지만 수백만~수천만 원 가능</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">취득세 신고·납부 방법</h2>
        <p className="mb-4 leading-relaxed">
          취득세는 잔금 납부일(실제 소유권 취득일)로부터 60일 이내에 신고·납부해야 합니다.
          위택스(wetax.go.kr)에서 온라인으로 신고할 수 있으며, 관할 시·군·구청 세무과에 직접 방문해도 됩니다.
          보통은 법무사가 등기와 함께 처리해주므로, 법무사를 통해 진행하는 것이 편리합니다.
        </p>
        <p className="mb-4 leading-relaxed">
          기한 내 신고하지 않으면 무신고 가산세 20%, 납부 지연 시 일별 0.022%의 연체이자가 부과됩니다.
          잔금일을 정확히 파악하고 기한을 놓치지 않도록 주의하세요.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3">관련 도구</h3>
        <Link
          href="/loan-calculator/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          PickPlay 부동산 취득세 계산기 →
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          주택 가격과 주택 수를 입력하면 취득세를 즉시 계산할 수 있습니다.
        </p>
      </div>
    </article>
  );
}
