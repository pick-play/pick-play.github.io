<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
  <title>Sitemap - PickPlay</title>
  <meta name="robots" content="noindex,follow"/>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style type="text/css">
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #334155;
      line-height: 1.6;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      margin-bottom: 32px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
    }
    .header h1 span {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .header p {
      font-size: 14px;
      color: #64748b;
    }
    .stats {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .stat {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 20px;
      font-size: 13px;
      color: #64748b;
    }
    .stat strong {
      color: #0f172a;
      font-size: 20px;
      display: block;
      margin-bottom: 2px;
    }
    table {
      width: 100%;
      background: #fff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      border-collapse: separate;
      border-spacing: 0;
      overflow: hidden;
      font-size: 13px;
    }
    th {
      background: #f1f5f9;
      text-align: left;
      padding: 12px 16px;
      font-weight: 600;
      color: #475569;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #e2e8f0;
    }
    td {
      padding: 10px 16px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #f8fafc; }
    td a {
      color: #4f46e5;
      text-decoration: none;
      word-break: break-all;
    }
    td a:hover { text-decoration: underline; }
    .langs {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    .lang-tag {
      display: inline-block;
      background: #eef2ff;
      color: #4338ca;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }
    .priority-high { color: #059669; font-weight: 600; }
    .priority-mid { color: #d97706; font-weight: 600; }
    .priority-low { color: #64748b; }
    .footer {
      margin-top: 24px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
    }
    @media (max-width: 640px) {
      .container { padding: 20px 12px; }
      .header h1 { font-size: 22px; }
      th, td { padding: 8px 10px; }
      .hide-mobile { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1><span>PickPlay</span> Sitemap</h1>
      <p>This sitemap contains all pages available for search engine crawlers.</p>
    </div>
    <div class="stats">
      <div class="stat">
        <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
        Total URLs
      </div>
      <div class="stat">
        <strong>5</strong>
        Languages
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 5%">#</th>
          <th style="width: 50%">URL</th>
          <th class="hide-mobile" style="width: 25%">Languages</th>
          <th style="width: 10%">Priority</th>
          <th class="hide-mobile" style="width: 10%">Freq</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:urlset/sitemap:url">
          <tr>
            <td style="color: #94a3b8;"><xsl:value-of select="position()"/></td>
            <td>
              <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
            </td>
            <td class="hide-mobile">
              <div class="langs">
                <xsl:for-each select="xhtml:link[@rel='alternate']">
                  <xsl:if test="@hreflang != 'x-default'">
                    <span class="lang-tag"><xsl:value-of select="@hreflang"/></span>
                  </xsl:if>
                </xsl:for-each>
              </div>
            </td>
            <td>
              <xsl:choose>
                <xsl:when test="sitemap:priority &gt;= 0.9">
                  <span class="priority-high"><xsl:value-of select="sitemap:priority"/></span>
                </xsl:when>
                <xsl:when test="sitemap:priority &gt;= 0.7">
                  <span class="priority-mid"><xsl:value-of select="sitemap:priority"/></span>
                </xsl:when>
                <xsl:otherwise>
                  <span class="priority-low"><xsl:value-of select="sitemap:priority"/></span>
                </xsl:otherwise>
              </xsl:choose>
            </td>
            <td class="hide-mobile"><xsl:value-of select="sitemap:changefreq"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
    <div class="footer">
      Generated by PickPlay
    </div>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
